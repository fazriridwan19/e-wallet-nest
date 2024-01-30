import { Transaction } from 'src/entities/transaction.entity';
import { BaseService } from './base/base.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { TransactionRepository } from 'src/repositories/transaction.repository';
import { Profile } from 'src/entities/profile.entity';
import { CreateTransactionDto } from 'src/dtos/create-transaction.dto';
import { DataSource } from 'typeorm';
import { WalletService } from './wallet.service';
import { StatusService } from './status.service';
import { TransactionHistory } from 'src/entities/transaction-history.entity';
import { Cron } from '@nestjs/schedule';
import { Wallet } from 'src/entities/wallet.entity';
import { Type } from 'src/entities/type.enum';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    private transactionRepository: TransactionRepository,
    private walletService: WalletService,
    private dataSource: DataSource,
    private statusService: StatusService,
  ) {
    super(transactionRepository);
  }

  async create(
    user: Profile,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userWallet = await this.walletService.findByIdWith(
        user,
        createTransactionDto.walletId,
      );
      const inProgresStatus = await this.statusService.findById(1);
      if (
        createTransactionDto.isExpense &&
        userWallet.balance < createTransactionDto.amount
      ) {
        throw new BadRequestException('wallet balance insufficient');
      }
      const newTransaction = new Transaction(createTransactionDto);
      newTransaction.wallet = userWallet;
      newTransaction.currentStatus = inProgresStatus;
      newTransaction.createdAt = new Date();
      newTransaction.updatedAt = new Date();
      if (!createTransactionDto.isExpense) {
        newTransaction.type = Type.Income;
        userWallet.balance += newTransaction.amount;
      } else {
        newTransaction.type = Type.Expense;
        userWallet.balance -= newTransaction.amount;
      }

      const history = new TransactionHistory();
      history.at = new Date();
      history.status = inProgresStatus;
      history.transaction = newTransaction;

      await queryRunner.manager.save(newTransaction);
      await queryRunner.manager.save(history);
      await queryRunner.manager.save(userWallet);
      await queryRunner.commitTransaction();

      return newTransaction;
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // TODO : Implement scheduler
  @Cron('45 * * * * *')
  async handleInProgressTransaction() {
    const inProgresStatus = await this.statusService.findById(1);
    const completeStatus = await this.statusService.findById(2);
    const inProgresTransactions: Transaction[] =
      await this.transactionRepository.find({
        where: {
          currentStatus: inProgresStatus,
        },
        relations: {
          wallet: {
            profile: {
              user: true,
            },
          },
        },
        order: {
          createdAt: 'ASC',
        },
      });
    if (inProgresTransactions.length === 0) return;
    this.logger.log('Start scheduling transaction ...');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const transaction of inProgresTransactions) {
        if (transaction.type === Type.Expense) {
          const receiverWallet: Wallet = await this.walletService.findByAccount(
            transaction.receiver,
          );
          if (receiverWallet) {
            const createTransactionDto = new CreateTransactionDto();
            createTransactionDto.amount = transaction.amount;
            createTransactionDto.description = `Transfer from ${transaction.wallet.profile.user.username}`;
            createTransactionDto.isExpense = false;
            createTransactionDto.name = `Transfer`;
            createTransactionDto.walletId = receiverWallet.id;
            await this.create(receiverWallet.profile, createTransactionDto);
          }
        }

        transaction.currentStatus = completeStatus;

        const history: TransactionHistory = new TransactionHistory();
        history.at = new Date();
        history.status = completeStatus;
        history.transaction = transaction;

        // save history
        await queryRunner.manager.save(history);
        // save completed transaction
        await queryRunner.manager.save(transaction);
      }

      // Commit and release after processing all transactions
      await queryRunner.commitTransaction();
      this.logger.log('Transaction committed.');
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
