import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWalletDto } from 'src/dtos/create-wallet.dto';
import { UpdateWalletDto } from 'src/dtos/update-wallet.dto';
import { Profile } from 'src/entities/profile.entity';
import { WalletService } from 'src/services/wallet.service';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  create(
    @CurrentUser() user: Profile,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    return this.walletService.saveWith(user, createWalletDto);
  }

  @Get()
  getAll(@CurrentUser() user: Profile) {
    return this.walletService.findAllWith(user);
  }

  @Get(':id')
  getById(@CurrentUser() user: Profile, @Param('id') id: string) {
    return this.walletService.findByIdWith(user, +id);
  }

  @Put(':id')
  update(
    @CurrentUser() user: Profile,
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return this.walletService.updateWith(user, +id, updateWalletDto);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: Profile, @Param('id') id: string) {
    try {
      await this.walletService.removeWith(user, +id);
      return { message: 'Wallet is deleted' };
    } catch (error) {
      console.log(error);
    }
  }
}
