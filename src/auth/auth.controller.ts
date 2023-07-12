import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthGuardClass } from './guards/Auth.Guard';
import { JwtService } from '@nestjs/jwt';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() registeringUser: RegisterUserDto) {
    const user = await this.authService.registerUser(registeringUser);

    return user;
  }

  @Post('/login')
  @UseGuards(AuthGuardClass)
  async loginUser(@Request() req) {
    return {
      token: this.jwtService.sign({
        id: req.user.Id,
        username: req.user.UserName,
        role: req.user.Role,
      }),
    };
  }
}
