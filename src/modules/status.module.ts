import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/entities/status.entity';
import { StatusRepository } from 'src/repositories/status.repository';
import { StatusService } from 'src/services/status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusRepository, StatusService],
  exports: [StatusService],
})
export class StatusModule {}
