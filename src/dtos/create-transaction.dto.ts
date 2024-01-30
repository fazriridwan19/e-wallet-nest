import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  receiver: string;

  @IsBoolean()
  @IsOptional()
  isExpense: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  walletId: number;
}
