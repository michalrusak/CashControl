import { Controller, Post, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { EndPoints } from 'src/enums/endPoints.enum';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Cookies } from 'src/enums/cookies.enum';
import { LoginPayload, RegisterPayload } from './auth.dto';

@Controller(EndPoints.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(EndPoints.register)
  async register(@Body() payload: RegisterPayload): Promise<any> {
    await this.authService.register(payload);
    return { message: 'User registered successfully' };
  }

  @Post(EndPoints.login)
  async login(
    @Body() payload: LoginPayload,
    @Res() res: Response,
  ): Promise<any> {
    const token = await this.authService.login(payload);
    res.cookie(Cookies.token, token, {
      httpOnly: true,
      maxAge: Number(process.env.EXPIRE_TIME),
    });
    return res.status(HttpStatus.OK).json({ token });
  }

  @Get(EndPoints.logout)
  async deleteCookie(@Res() res: Response) {
    res.clearCookie(Cookies.token);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User logout successfully' });
  }
}
