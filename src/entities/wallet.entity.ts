import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { CreateWalletDto } from 'src/dtos/create-wallet.dto';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ default: 0, nullable: true })
  balance: number;

  @Column('text', { nullable: true, unique: true })
  account: string;

  @ManyToOne(() => Profile, (profile) => profile.wallets)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  constructor(data: CreateWalletDto) {
    Object.assign(this, data);
  }
}