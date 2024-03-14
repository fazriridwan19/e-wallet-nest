import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './modules/profile.module';
import { AuthModule } from './modules/auth.module';
import { WalletModule } from './modules/wallet.module';
import { StatusModule } from './modules/status.module';
import { TransactionModule } from './modules/transaction.module';
import { TransactionHistoryModule } from './modules/transaction-history.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './modules/user.module';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Status } from './entities/status.entity';
import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionHistory } from './entities/transaction-history.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        schema: configService.get<string>('DB_SCHEMA'),
        entities: [
          User,
          Profile,
          Status,
          Wallet,
          Transaction,
          TransactionHistory,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
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
