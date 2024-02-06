import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProfileDto } from 'src/entities/dto/create-profile.dto';
import { LoginDto } from '../entities/dto/login.dto';
import { Profile } from 'src/entities/profile.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from './profile.service';

@Injectable()
export class AuthService {
  constructor(
    private profileService: ProfileService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async registration(createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const profile: Profile = await this.profileService.findByUsername(
      loginDto.username,
    );
    if (!profile)
      return new UnauthorizedException('Username or password is invalid');
    const { user, ...result } = profile;
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid)
      return new UnauthorizedException('Username or password is invalid');
    return this.generateToken(user.profileId, user.username);
  }

  private async generateToken(userId: number, username: string) {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('SECRET_TOKEN');
    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn: '1h',
    });
    return { token };
  }
}
