import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from './base/base.service';
import { WalletRepository } from 'src/repositories/wallet.repository';
import { Wallet } from 'src/entities/wallet.entity';
import { Profile } from 'src/entities/profile.entity';
import { CreateWalletDto } from 'src/dtos/create-wallet.dto';
import { UpdateWalletDto } from 'src/dtos/update-wallet.dto';

@Injectable()
export class WalletService extends BaseService<Wallet> {
  constructor(private walletRepository: WalletRepository) {
    super(walletRepository);
  }

  saveWith(user: Profile, createWalletDto: CreateWalletDto): Promise<Wallet> {
    createWalletDto.profile = user;
    return this.save(createWalletDto);
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
      where: { id },
      relations: {
        profile: true,
      },
    });
    if (wallet.profile.id !== user.id)
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