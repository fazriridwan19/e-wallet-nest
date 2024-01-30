import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Status } from './status.entity';

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Transaction, (transaction) => transaction.histories)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @ManyToOne(() => Status, (status) => status.histories)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @Column()
  at: Date;
}
