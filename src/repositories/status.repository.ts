import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/entities/status.entity';
import { Repository } from 'typeorm';

export class StatusRepository extends Repository<Status> {
  constructor(@InjectRepository(Status) statusRepository: Repository<Status>) {
    super(
      statusRepository.target,
      statusRepository.manager,
      statusRepository.queryRunner,
    );
  }
}
