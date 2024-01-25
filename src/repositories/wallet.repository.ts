import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/wallet.entity';
import { Repository } from 'typeorm';

export class WalletRepository extends Repository<Wallet> {
  constructor(@InjectRepository(Wallet) walletRepository: Repository<Wallet>) {
    super(
      walletRepository.target,
      walletRepository.manager,
      walletRepository.queryRunner,
    );
  }
}
