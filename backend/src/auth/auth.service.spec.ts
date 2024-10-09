import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  loginPayload,
  registerPayload,
  mockUser,
  userIdCorrect,
  userIdInvalid,
} from 'src/mock-data/mockData';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: any;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn().mockResolvedValue(registerPayload),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken('User'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword');

      const result = await authService.register(registerPayload);

      expect(result).toEqual(registerPayload);
      expect(userModel.findOne).toHaveBeenCalledWith({
        email: registerPayload.email,
      });
      expect(userModel.create).toHaveBeenCalledWith({
        email: registerPayload.email,
        password: 'hashedPassword',
        firstName: registerPayload.firstName,
        lastName: registerPayload.lastName,
      });
    });

    it('should throw an error if user already exists', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(registerPayload);

      await expect(authService.register(registerPayload)).rejects.toThrow(
        new HttpException('User already exists', HttpStatus.CONFLICT),
      );
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('token');

      const result = await authService.login(loginPayload);

      expect(result).toEqual({
        token: 'token',
        user: {
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
        },
      });
    });

    it('should throw an error for invalid credentials', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      await expect(authService.login(loginPayload)).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw an error for invalid password', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(authService.login(loginPayload)).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('autoLogin', () => {
    it('should auto-login a user successfully', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(mockUser);

      const result = await authService.autoLogin(userIdCorrect);

      expect(result).toEqual({
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      });
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

      await expect(authService.autoLogin(userIdInvalid)).rejects.toThrow(
        new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});
