import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/entities/user.entity';

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
    if (!profile) throw new ConflictException('User already exists');
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
    if (!profile) throw new ConflictException('User already exists');
    return profile;
  }

  async create(createProfileDto: CreateProfileDto): Promise<any> {
    const profile: Profile = new Profile(createProfileDto);
    const createUser: User = new User(createProfileDto);
    // TODO : Hash password
    profile.user = createUser;
    const savedProfile = await this.dataSource
      .getRepository(Profile)
      .save(profile);
    const { user, ...result } = await this.findById(savedProfile.id);
    return result;
  }
}
