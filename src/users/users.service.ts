import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, isValidObjectId } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: registerUserDto.email });
    if (user) {
      throw new ConflictException(`This email is already registered!`);
    }
    const hashedPassword = await this.hashPassword(registerUserDto.password);
    registerUserDto.password = hashedPassword;
    const newUser = await this.userModel.create(registerUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async get(_id: string): Promise<User> {
    if (!isValidObjectId(_id)) {
      throw new BadRequestException('Invalid ID.');
    }
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return await this.userModel.findById(_id);
  }

  async findByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }

  async removeUser(_id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove({ _id });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
