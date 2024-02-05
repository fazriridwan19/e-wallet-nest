import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from './base/base.service';
import { WalletRepository } from '../repositories/wallet.repository';
import { Wallet } from '../entities/wallet.entity';
import { Profile } from '../entities/profile.entity';
import { CreateWalletDto } from '../entities/dto/create-wallet.dto';
import { UpdateWalletDto } from '../entities/dto/update-wallet.dto';

@Injectable()
export class WalletService extends BaseService<Wallet> {
  constructor(private walletRepository: WalletRepository) {
    super(walletRepository);
  }

  saveWith(user: Profile, createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = new Wallet(createWalletDto);
    wallet.profile = user;
    return this.save(wallet);
  }

  findByAccount(account: string): Promise<Wallet> {
    return this.walletRepository.findOne({
      where: {
        account,
      },
      relations: {
        profile: true,
      },
    });
  }

  findAllWith(user: Profile): Promise<Wallet[]> {
    return this.walletRepository.find({
      where: {
        profile: user,
      },
    });
  }

  async findByIdWith(user: Profile, id: number) {
    const wallet = await this.walletRepository.findOne({
      where: {
        id,
        profile: {
          id: user.id,
        },
      },
      relations: {
        profile: true,
      },
    });
    if (!wallet)
      throw new NotFoundException('Wallet for this user is not found');
    return wallet;
  }

  async updateWith(
    user: Profile,
    walletId: number,
    updateWalletDto: UpdateWalletDto,
  ): Promise<Wallet> {
    await this.findByIdWith(user, walletId);
    return this.update(walletId, updateWalletDto);
  }

  async removeWith(user: Profile, id: number): Promise<void> {
    await this.findByIdWith(user, id);
    this.remove(id);
  }
}
