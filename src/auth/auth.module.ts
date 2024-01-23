import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [ProfileModule, JwtModule.register({ global: true })],
  providers: [AuthService, { provide: 'APP_GUARD', useClass: AuthGuard }],
  controllers: [AuthController],
})
export class AuthModule {}
