import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionHistory } from './transaction-history.entity';

@Entity({ name: 'status' })
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.currentStatus, {
    cascade: true,
  })
  transactions: Transaction[];

  @OneToMany(
    () => TransactionHistory,
    (transactionHistory) => transactionHistory.status,
    { cascade: true },
  )
  histories: TransactionHistory[];
}
