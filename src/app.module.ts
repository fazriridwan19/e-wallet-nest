import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { ProfileModule } from './modules/profile.module';
import { AuthModule } from './modules/auth.module';
import { Wallet } from './entities/wallet.entity';
import { WalletModule } from './modules/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      entities: [Profile, User, Wallet],
      synchronize: true,
    }),
    ProfileModule,
    AuthModule,
    WalletModule,
  ],
})
export class AppModule {}
