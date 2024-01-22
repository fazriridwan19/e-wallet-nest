import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [ProfileModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
