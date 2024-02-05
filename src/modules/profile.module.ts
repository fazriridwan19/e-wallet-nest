import { Module } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileRepository } from '../repositories/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
