import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();

    return users;
  }

  // @Get('/:id')
  // async getProductBySlug(@Param('id', ParseIntPipe) id: number) {
  //   const product = await this.userService.getUserById(id);

  //   if (!product) {
  //     throw new NotFoundException('Product not found!');
  //   }
  //   return product;
  // }
}
