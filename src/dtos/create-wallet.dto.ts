import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Profile } from 'src/entities/profile.entity';

export class CreateWalletDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNumber()
  @IsOptional()
  balance: number;

  @IsString()
  @IsOptional()
  account: string;

  profile: Profile;
}
