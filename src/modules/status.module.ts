import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from '../entities/status.entity';
import { StatusRepository } from '../repositories/status.repository';
import { StatusService } from '../services/status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusRepository, StatusService],
  exports: [StatusService],
})
export class StatusModule {}
