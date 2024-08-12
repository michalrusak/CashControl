import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { EndPoints } from '../enums/endPoints.enum';
import { UserService } from './user.service';
import { ChangePasswordPayload, UpdateUserPayload } from './user.dto';
import { Response } from 'express';

@Controller(EndPoints.user)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserInfo(@Req() req) {
    const userId = req.user;
    return await this.userService.getUserInfo(userId);
  }

  @Patch()
  async updateUser(
    @Req() req,
    @Body() payload: UpdateUserPayload,
    @Res() res: Response,
  ): Promise<any> {
    const userId = req.user;
    await this.userService.updateUser(userId, payload);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User updated successfully' });
  }

  @Post()
  async changePassword(
    @Req() req,
    @Body() payload: ChangePasswordPayload,
    @Res() res: Response,
  ) {
    const userId = req.user;
    await this.userService.changePassword(userId, payload);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User changed password successfully' });
  }

  @Delete()
  async deleteAccount(@Req() req, @Res() res: Response) {
    const userId = req.user;
    await this.userService.deleteAccount(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User account deleted successfully' });
  }
}
