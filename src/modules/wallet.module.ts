import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from '../controllers/wallet.controller';
import { Wallet } from '../entities/wallet.entity';
import { WalletRepository } from '../repositories/wallet.repository';
import { WalletService } from '../services/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletRepository, WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
