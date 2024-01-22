import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  lastName: string;

  @IsDateString()
  @IsOptional()
  birth: Date;

  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email: string;

  @IsPhoneNumber('ID')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
