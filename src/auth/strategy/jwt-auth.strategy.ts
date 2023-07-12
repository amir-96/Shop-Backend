import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'J*1s2Ds5&f}-s1#C/B(3DF*!&',
    });
  }

  async validate(payload) {
    const user = await this.authService.validateUserByToken(payload.id);
    return { id: user.Id, username: user.UserName, role: user.Role }
  }
}
