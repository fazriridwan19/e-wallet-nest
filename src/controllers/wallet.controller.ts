import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWalletDto } from '../entities/dto/create-wallet.dto';
import { ResponseApi } from '../entities/dto/response-api.dto';
import { UpdateWalletDto } from '../entities/dto/update-wallet.dto';
import { Profile } from '../entities/profile.entity';
import { WalletService } from '../services/wallet.service';
import { CurrentUser } from '../utils/decorators/current-user.decorator';

@ApiTags('Wallet')
@ApiResponse({ type: ResponseApi })
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiBody({ type: CreateWalletDto })
  @Post()
  async create(
    @CurrentUser() user: Profile,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    return new ResponseApi(
      201,
      'Succes',
      await this.walletService.saveWith(user, createWalletDto),
    );
  }

  @Get()
  async getAll(@CurrentUser() user: Profile) {
    return new ResponseApi(
      200,
      'Succes',
      await this.walletService.findAllWith(user),
    );
  }

  @Get(':id')
  async getById(@CurrentUser() user: Profile, @Param('id') id: string) {
    return new ResponseApi(
      200,
      'Succes',
      await this.walletService.findByIdWith(user, +id),
    );
  }

  @Put(':id')
  async update(
    @CurrentUser() user: Profile,
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return new ResponseApi(
      201,
      'Succes',
      await this.walletService.updateWith(user, +id, updateWalletDto),
    );
  }

  @Delete(':id')
  async remove(@CurrentUser() user: Profile, @Param('id') id: string) {
    try {
      await this.walletService.removeWith(user, +id);
      return new ResponseApi(200, 'Succes', null);
    } catch (error) {
      console.log(error);
    }
  }
}
