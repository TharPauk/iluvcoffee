import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (isAuthenticated) {
        const { email, firstName, lastName, _id } = user;
        const token = await this.jwtService.signAsync({
          email,
          firstName,
          lastName,
          _id,
        });
        return { token: token };
      }
    }
    return null;
    // throw new UnauthorizedException();
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { _id, email, firstName, lastName } =
      await this.usersService.findByEmail(loginUserDto.email);
    const accessToken = this.jwtService.sign({
      _id,
      email,
      firstName,
      lastName,
    });
    return { accessToken };
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    return await this.usersService.create(registerUserDto);
  }
}
