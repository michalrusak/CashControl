import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { EndPoints } from 'src/enums/endPoints.enum';
import { UserService } from './user.service';
import { ChangePasswordPayload, UpdateUserPayload } from './user.dto';

@Controller(EndPoints.user)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserInfo(@Req() req) {
    const userId = req.user;
    return await this.userService.getUserInfo(userId);
  }

  @Patch()
  async updateUser(@Req() req, @Body() payload: UpdateUserPayload) {
    const userId = req.user;
    return await this.userService.updateUser(userId, payload);
  }

  @Post()
  async changePassword(@Req() req, @Body() payload: ChangePasswordPayload) {
    const userId = req.user;
    return await this.userService.changePassword(userId, payload);
  }

  @Delete()
  async deleteAccount(@Req() req) {
    const userId = req.user;
    return await this.userService.deleteAccount(userId);
  }
}
