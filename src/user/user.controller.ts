import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtGuardClass } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from './decorators/role.decorator';
import { RoleGuard } from './guards/role.guard';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuardClass, RoleGuard)
  @Roles('ADMIN')
  async getUsers(): Promise<FindUserDto[]> {
    const users = await this.userService.getAllUsers();

    return users;
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<FindUserDto> {
    const user = await this.userService.getOneUser(id);

    return user;
  }

  @Post()
  async addUser(@Body() newUser: CreateUserDto) {
    const user = await this.userService.addUser(newUser);

    return user;
  }

  @Put('/:id')
  async updateUser(
    @Body() changedUser: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindUserDto> {
    const user = await this.userService.updateUser(id, changedUser);

    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);

    return 'User deleted';
  }
}
