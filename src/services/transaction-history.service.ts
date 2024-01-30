import { Injectable } from '@nestjs/common';
import { BaseService } from './base/base.service';
import { TransactionHistory } from 'src/entities/transaction-history.entity';
import { TransactionHistoryRepository } from 'src/repositories/transaction-history.repository';

@Injectable()
export class TransactionHistoryService extends BaseService<TransactionHistory> {
  constructor(private historyRepository: TransactionHistoryRepository) {
    super(historyRepository);
  }
}
