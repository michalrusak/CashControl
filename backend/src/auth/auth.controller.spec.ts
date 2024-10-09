import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import {
  loginPayload,
  registerPayload,
  mockUser,
} from 'src/mock-data/mockData';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    autoLogin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  const createMockResponse = (): Partial<Response> => {
    return {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  };

  describe('register', () => {
    it('should register a user successfully', async () => {
      mockAuthService.register.mockResolvedValueOnce(undefined);

      const response = await authController.register(registerPayload);

      expect(response).toEqual({ message: 'User registered successfully' });
      expect(mockAuthService.register).toHaveBeenCalledWith(registerPayload);
    });

    it('should handle registration errors', async () => {
      mockAuthService.register.mockRejectedValueOnce(
        new Error('User already exists'),
      );

      await expect(authController.register(registerPayload)).rejects.toThrow(
        'User already exists',
      );
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      const result = {
        token: 'some-token',
        user: mockUser,
      };
      mockAuthService.login.mockResolvedValueOnce(result);

      const res = createMockResponse() as Response;

      await authController.login(loginPayload, res);

      expect(res.cookie).toHaveBeenCalledWith('token', 'some-token', {
        httpOnly: true,
        maxAge: Number(process.env.EXPIRE_TIME),
      });
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ user: result.user });
    });

    it('should handle login errors', async () => {
      mockAuthService.login.mockRejectedValueOnce(
        new Error('Invalid credentials'),
      );

      const res = createMockResponse() as Response;

      await expect(authController.login(loginPayload, res)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('deleteCookie', () => {
    it('should log out a user and clear the cookie', async () => {
      const req = { cookies: { token: 'some-token' }, user: mockUser };
      const res = createMockResponse() as Response;

      await authController.deleteCookie(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith('token');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User logout successfully',
      });
    });

    it('should return unauthorized if token is not provided', async () => {
      const req = { cookies: {} };
      const res = createMockResponse() as Response;

      await authController.deleteCookie(req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });
    });
  });

  describe('autoLogin', () => {
    it('should automatically log in a user', async () => {
      const req = { user: 'some-user-id' };
      const res = createMockResponse() as Response;

      mockAuthService.autoLogin.mockResolvedValueOnce(mockUser);

      await authController.autoLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should handle auto-login errors', async () => {
      const req = { user: 'some-user-id' };
      const res = createMockResponse() as Response;

      mockAuthService.autoLogin.mockRejectedValueOnce(
        new Error('User not found'),
      );

      await expect(authController.autoLogin(req, res)).rejects.toThrow(
        'User not found',
      );
    });
  });
});
