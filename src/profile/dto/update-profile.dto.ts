import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateProfileDto {
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
}
