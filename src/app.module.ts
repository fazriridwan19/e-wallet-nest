import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { ProfileModule } from './modules/profile.module';
import { AuthModule } from './modules/auth.module';
import { Wallet } from './entities/wallet.entity';
import { WalletModule } from './modules/wallet.module';
import { Transaction } from './entities/transaction.entity';
import { Status } from './entities/status.entity';
import { StatusModule } from './modules/status.module';
import { TransactionModule } from './modules/transaction.module';
import { TransactionHistory } from './entities/transaction-history.entity';
import { TransactionHistoryModule } from './modules/transaction-history.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      entities: [
        Profile,
        User,
        Wallet,
        Transaction,
        Status,
        TransactionHistory,
      ],
      synchronize: true,
    }),
    ProfileModule,
    UserModule,
    AuthModule,
    WalletModule,
    StatusModule,
    TransactionModule,
    TransactionHistoryModule,
  ],
})
export class AppModule {}
