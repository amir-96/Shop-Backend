import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async registerUser(body: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const isUser = await this.prismaService.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!isUser) {
      try {
        const user = await this.prismaService.user.create({
          data: {
            username: body.username,
            password: hashedPassword,
            email: body.email,
          },
          select: {
            username: true,
            email: true,
          },
        });
        return user;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  async loginUser(body: LoginUserDto) {}

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
