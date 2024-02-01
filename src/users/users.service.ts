import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './shemas/user.schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'join@gmail.com',
      username: 'john',
      password: '123',
    },
    {
      id: 2,
      email: 'maria@gmail.com',
      username: 'maria',
      password: '123',
    },
  ];
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<any | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async create(createUserDto: {
    name?: string;
    email: string;
    pass: string;
  }): Promise<any> {
    const saltOrRounds = 10;
    const hashPass = await bcrypt.hash(createUserDto.pass, saltOrRounds);
    const createdCat = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      passWord: hashPass,
    });
    const user = await createdCat.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passWord, ...filterUser } = user;
    return filterUser;
  }
}
