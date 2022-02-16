import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.registerUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<User> {
    return this.authService.login(body);
  }
}
