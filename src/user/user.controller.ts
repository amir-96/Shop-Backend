import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtGuardClass } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from './decorators/role.decorator';
import { RoleGuard } from './guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');

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
  @UseGuards(JwtGuardClass, RoleGuard)
  @Roles('ADMIN')
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
  @UseGuards(JwtGuardClass, RoleGuard)
  @Roles('ADMIN')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);

    return 'User deleted';
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = path.parse(file.originalname).name;
          const fileExt = path.parse(file.originalname).ext;

          return cb(null, `${fileName}-${Date.now()}${fileExt}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const fileName = path.parse(file.originalname).name;
        const fileExt = path.parse(file.originalname).ext;

        if (fileExt !== '.jpg') {
          return cb(new BadRequestException('File type should be jpg'), false);
        }

        return cb(null, true);
      },
    }),
  )
  uploadFile(
    @Body() body: any,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    console.log(image);
  }

  @Get('/image/:imgName')
  getProfilePhoto(@Param('imgName') imgName: string, @Res() res) {
    return res.sendFile(imgName, { root: './uploads' });
  }
}
