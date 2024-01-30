import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Profile } from 'src/entities/profile.entity';

export class CreateWalletDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  balance: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  account: string;

  profile: Profile;
}
