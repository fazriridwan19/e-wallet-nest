import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from 'src/controllers/transaction.controller';
import { Transaction } from 'src/entities/transaction.entity';
import { TransactionRepository } from 'src/repositories/transaction.repository';
import { TransactionService } from 'src/services/transaction.service';
import { WalletModule } from './wallet.module';
import { StatusModule } from './status.module';

@Module({
  imports: [
    WalletModule,
    StatusModule,
    TypeOrmModule.forFeature([Transaction]),
  ],
  providers: [TransactionRepository, TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
