import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionDto } from '../entities/dto/create-transaction.dto';
import { ResponseApi } from '../entities/dto/response-api.dto';
import { Profile } from '../entities/profile.entity';
import { TransactionService } from '../services/transaction.service';
import { CurrentUser } from '../utils/decorators/current-user.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async create(
    @CurrentUser() user: Profile,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const result = await this.transactionService.create(
      user,
      createTransactionDto,
    );
    return new ResponseApi(201, 'Success', result);
  }
}
