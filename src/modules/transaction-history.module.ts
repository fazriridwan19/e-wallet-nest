import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionHistory } from 'src/entities/transaction-history.entity';
import { TransactionHistoryRepository } from 'src/repositories/transaction-history.repository';
import { TransactionHistoryService } from 'src/services/transaction-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionHistory])],
  providers: [TransactionHistoryRepository, TransactionHistoryService],
})
export class TransactionHistoryModule {}
