import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from 'src/controllers/wallet.controller';
import { Wallet } from 'src/entities/wallet.entity';
import { WalletRepository } from 'src/repositories/wallet.repository';
import { WalletService } from 'src/services/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletRepository, WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
