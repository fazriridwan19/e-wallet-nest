import { BadRequestException, Injectable } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { DataSource } from 'typeorm';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { BaseService } from './base/base.service';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(
    private profileRepository: ProfileRepository,
    private dataSource: DataSource,
  ) {
    super(profileRepository);
  }

  async findByUsername(username: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          username: username,
        },
      },
      relations: {
        user: true,
      },
    });
    return profile;
  }

  async create(createProfileDto: CreateProfileDto): Promise<any> {
    // const profileDb = await this.dataSource
    //   .getRepository(User)
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.profile', 'profile')
    //   .where('user.username = :username', {
    //     username: createProfileDto.username,
    //   })
    //   .orWhere('profile.email = :email', {
    //     email: createProfileDto.email,
    //   })
    //   .orWhere('profile.phone = :phone', {
    //     phone: createProfileDto.phone,
    //   })
    //   .getOne();
    try {
      const profile: Profile = new Profile(createProfileDto);
      const createUser: User = new User(createProfileDto);
      createUser.password = await bcrypt.hash(createProfileDto.password, 10);
      profile.user = createUser;
      const savedProfile = await this.save(profile);
      const { user, ...result } = await this.findById(savedProfile.id);
      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }
}
