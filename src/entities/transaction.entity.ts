import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';
import { Status } from './status.entity';
import { TransactionHistory } from './transaction-history.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: true })
  receiver: string;

  @Column({ length: 15, nullable: false })
  type: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @ManyToOne(() => Status, (status) => status.transactions)
  @JoinColumn({ name: 'current_status_id' })
  currentStatus: Status;

  @OneToMany(
    () => TransactionHistory,
    (transactionHistory) => transactionHistory.transaction,
    { cascade: true },
  )
  histories: TransactionHistory[];

  constructor(data: CreateTransactionDto) {
    Object.assign(this, data);
  }
}
