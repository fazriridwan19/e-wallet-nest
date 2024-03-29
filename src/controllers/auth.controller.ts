import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateProfileDto } from '../entities/dto/create-profile.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../entities/dto/login.dto';
import { Public } from '../utils/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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
