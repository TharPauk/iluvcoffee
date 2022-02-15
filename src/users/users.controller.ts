import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.get(id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.removeUser(id);
  }
}
