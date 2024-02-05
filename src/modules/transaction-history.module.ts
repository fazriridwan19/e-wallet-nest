import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionHistory } from '../entities/transaction-history.entity';
import { TransactionHistoryRepository } from '../repositories/transaction-history.repository';
import { TransactionHistoryService } from '../services/transaction-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionHistory])],
  providers: [TransactionHistoryRepository, TransactionHistoryService],
})
export class TransactionHistoryModule {}
