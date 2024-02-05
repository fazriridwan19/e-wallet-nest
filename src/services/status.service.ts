import { Status } from 'src/entities/status.entity';
import { BaseService } from './base/base.service';
import { StatusRepository } from '../repositories/status.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService extends BaseService<Status> {
  constructor(private statusRepository: StatusRepository) {
    super(statusRepository);
  }
}
