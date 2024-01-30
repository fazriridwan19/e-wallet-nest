import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';
import { Profile } from 'src/entities/profile.entity';
import { UpdateProfileDto } from 'src/dtos/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.profileService.findById(+id);
  }

  @Get('user/current')
  findCurrentUser(@CurrentUser() user: Profile) {
    return user;
  }

  @Put()
  update(
    @CurrentUser() user: Profile,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(user.id, updateProfileDto);
  }

  @Delete()
  remove(@CurrentUser() user: Profile) {
    return this.profileService.remove(user.id);
  }
}
