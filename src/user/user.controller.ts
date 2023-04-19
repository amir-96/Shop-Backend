import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(
    @Query() query: { username: string },
  ): Promise<CreateUserDto | CreateUserDto[]> {
    if (!query) {
      const users = await this.userService.getUsers();

      return users;
    } else {
      const { username } = query;

      const user = await this.userService.getUserByUserName(username);

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      return user;
    }
  }

  @Get('/:id')
  async getProductBySlug(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CreateUserDto> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Put('/:username')
  async updateProduct(
    @Body() body: UpdateUserDto,
    @Param('username') username: string,
  ): Promise<boolean> {
    const updatedUser = await this.userService.updateUser(body, username);

    return updatedUser;
  }

  @Delete('/:username')
  async deleteProduct(@Param('username') username: string): Promise<boolean> {
    const deletedUser = await this.userService.deleteUser(username);

    return deletedUser;
  }
}
