import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ProfileModule } from 'src/modules/profile.module';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../services/auth.guard';
import { WalletModule } from './wallet.module';

@Module({
  imports: [ProfileModule, JwtModule.register({ global: true }), WalletModule],
  providers: [AuthService, { provide: 'APP_GUARD', useClass: AuthGuard }],
  controllers: [AuthController],
})
export class AuthModule {}
