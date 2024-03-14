import { Profile } from '../entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(private readonly dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }
}
