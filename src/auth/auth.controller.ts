import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async registerUser(@Body() body: RegisterUserDto) {
    const user = await this.authService.registerUser(body);
    return user;
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Body() body: LoginUserDto, @Request() req) {
    return {
      token: this.jwtService.sign({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      }),
    };
  }

  @Get('/profile')
  profile() {

  }
}
