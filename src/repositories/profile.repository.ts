import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { Repository } from 'typeorm';

export class ProfileRepository extends Repository<Profile> {
  constructor(
    @InjectRepository(Profile) profileRepository: Repository<Profile>,
  ) {
    super(
      profileRepository.target,
      profileRepository.manager,
      profileRepository.queryRunner,
    );
  }
}
