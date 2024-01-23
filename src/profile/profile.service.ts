import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private dataSource: DataSource,
  ) {}

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

  async findById(id: number): Promise<Profile> {
    const profile: Profile = await this.profileRepository.findOne({
      where: {
        id: id,
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
      const savedProfile = await this.dataSource
        .getRepository(Profile)
        .save(profile);
      const { user, ...result } = await this.findById(savedProfile.id);
      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }
}
