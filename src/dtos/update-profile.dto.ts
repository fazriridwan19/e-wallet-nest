import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { Profile } from 'src/entities/profile.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class UpdateProfileDto implements QueryDeepPartialEntity<Profile> {
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
}
