import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<CreateUserDto[]> {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async getUserByUserName(username: string): Promise<CreateUserDto> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: username.toLowerCase(),
      },
    });

    return user;
  }

  async getUserById(id: number): Promise<CreateUserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async createUser(body: CreateUserDto): Promise<Boolean> {
    const isUser = await this.prismaService.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!isUser) {
      try {
        await this.prismaService.user.create({
          data: {
            username: body.username,
            password: body.password,
            email: body.email,
          },
        });
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  async updateUser(body: UpdateUserDto, username: string): Promise<boolean> {
    try {
      await this.prismaService.user.update({
        where: {
          username: username.toLowerCase(),
        },
        data: {
          password: body.password,
          email: body.email,
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteUser(username: string): Promise<boolean> {
    try {
      await this.prismaService.user.delete({
        where: {
          username: username.toLowerCase(),
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
