import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  // Register user

  async registerUser(registeringUser: RegisterUserDto) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { UserName: registeringUser.userName },
      });

      if (existingUser) {
        throw new BadRequestException('User is existing');
      }

      const hashedPassword = await bcrypt.hash(registeringUser.password, 10);

      const user = await this.prismaService.user.create({
        data: {
          UserName: registeringUser.userName,
          Password: hashedPassword,
        },
      });

      return user;
    } catch (err) {
      throw new BadRequestException(`Failed to add user: ${err.message}`);
    }
  }

  // Login user

  async validateUser(userName: string, password: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { UserName: userName },
      });

      if (!user) {
        throw new UnauthorizedException('User is not exists');
      }

      const isMatch = await bcrypt.compare(password, user.Password);

      if (!isMatch) {
        throw new UnauthorizedException('Password is wrong');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException(`Failed to add user: ${err.message}`);
    }
  }

  // Validate user by token

  async validateUserByToken(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { Id: id },
      });

      if (!user) {
        throw new UnauthorizedException('User is not exists');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException(`Failed to load user: ${err.message}`);
    }
  }
}
