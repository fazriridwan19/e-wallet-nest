import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ProfileModule } from 'src/modules/profile.module';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../services/auth.guard';

@Module({
  imports: [ProfileModule, JwtModule.register({ global: true })],
  providers: [AuthService, { provide: 'APP_GUARD', useClass: AuthGuard }],
  controllers: [AuthController],
})
export class AuthModule {}
