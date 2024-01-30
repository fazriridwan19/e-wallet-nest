import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionDto } from 'src/dtos/create-transaction.dto';
import { ResponseApi } from 'src/dtos/response-api.dto';
import { Profile } from 'src/entities/profile.entity';
import { TransactionService } from 'src/services/transaction.service';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async create(
    @CurrentUser() user: Profile,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return new ResponseApi(
      201,
      'Success',
      await this.transactionService.create(user, createTransactionDto),
    );
  }
}
