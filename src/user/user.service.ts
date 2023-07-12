import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  // Get all users

  async getAllUsers(): Promise<FindUserDto[]> {
    try {
      const allUsers = await this.prismaService.user.findMany();

      return allUsers;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Get one user

  async getOneUser(id: number): Promise<FindUserDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          Id: id,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  // Add new user

  async addUser(newUser: CreateUserDto) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { UserName: newUser.userName },
      });

      if (existingUser) {
        throw new BadRequestException('User is existing');
      }

      const user = await this.prismaService.user.create({
        data: {
          UserName: newUser.userName,
          Password: newUser.password,
        },
      });

      return user;
    } catch (err) {
      throw new BadRequestException(`Failed to add user: ${err.message}`);
    }
  }

  // Update user

  async updateUser(
    id: number,
    changedUser: UpdateUserDto,
  ): Promise<FindUserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        Id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          Id: id,
        },
        data: {
          Password: changedUser.password,
        },
      });

      return updatedUser;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Delete user

  async deleteUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        Id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.prismaService.user.delete({
        where: {
          Id: id,
        },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
