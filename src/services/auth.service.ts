import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from 'src/dtos/create-profile.dto';
import { ProfileService } from 'src/services/profile.service';
import { LoginDto } from '../dtos/login.dto';
import { Profile } from 'src/entities/profile.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

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
      throw new NotFoundException('Username or password is invalid');
    const { user, ...result } = profile;
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new NotFoundException('Username or password is invalid');
    return this.generateToken(user.profileId, user.username);
  }

  async generateToken(userId: number, username: string) {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('SECRET_TOKEN');
    const token = await this.jwtService.sign(payload, {
      secret,
      expiresIn: '1h',
    });
    return { token };
  }
}
