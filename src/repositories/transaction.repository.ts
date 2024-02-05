import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Repository } from 'typeorm';

export class TransactionRepository extends Repository<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    transationRepository: Repository<Transaction>,
  ) {
    super(
      transationRepository.target,
      transationRepository.manager,
      transationRepository.queryRunner,
    );
  }
}
