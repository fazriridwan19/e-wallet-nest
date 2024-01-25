import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateProfileDto } from 'src/dtos/create-profile.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { Public } from '../utils/decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  registration(@Body() createProfileDto: CreateProfileDto) {
    return this.authService.registration(createProfileDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
