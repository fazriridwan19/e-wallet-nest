import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birth: Date;

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('ID')
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
