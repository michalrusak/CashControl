import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginPayload, RegisterPayload } from './auth.dto';
import { safeParse } from 'valibot';
import { LoginPayloadSchema, RegisterPayloadSchema } from './auth.schema';
import { Database } from '../enums/database.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Database.user) private readonly userModel: Model<User>,
  ) {}

  async register(registerPayload: RegisterPayload): Promise<User> {
    const result = safeParse(RegisterPayloadSchema, registerPayload);

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(registerPayload.password, 10);
    const newUser = new this.userModel({
      email: registerPayload.email,
      password: hashedPassword,
      firstName: registerPayload.firstName,
      lastName: registerPayload.lastName,
    });
    return newUser.save();
  }

  async login(loginPayload: LoginPayload): Promise<any> {
    const result = safeParse(LoginPayloadSchema, loginPayload);

    if (!result.success) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel
      .findOne({ email: loginPayload.email })
      .exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginPayload.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: Number(process.env.EXPIRE_TIME) },
    );
    return {
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async autoLogin(userId: string) {
    if (!userId) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
