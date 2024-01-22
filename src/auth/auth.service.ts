import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { LoginDto } from './dto/login.dto';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(private profileService: ProfileService) {}

  async registration(createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const profile = await this.profileService.findByUsername(loginDto.username);
    if (!profile)
      throw new NotFoundException('Username or password is invalid');
    const { user, ...result } = profile;
    // TODO : compare password using bcrypt
    return result;
  }
}
