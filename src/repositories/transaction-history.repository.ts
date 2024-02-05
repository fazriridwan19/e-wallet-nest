import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHistory } from '../entities/transaction-history.entity';
import { Repository } from 'typeorm';

export class TransactionHistoryRepository extends Repository<TransactionHistory> {
  constructor(
    @InjectRepository(TransactionHistory)
    transactionHistoryRepository: Repository<TransactionHistory>,
  ) {
    super(
      transactionHistoryRepository.target,
      transactionHistoryRepository.manager,
      transactionHistoryRepository.queryRunner,
    );
  }
}
