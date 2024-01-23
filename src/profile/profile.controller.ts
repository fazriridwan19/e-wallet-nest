import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.profileService.findById(+id);
  }

  @Get('user/current')
  async findCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
