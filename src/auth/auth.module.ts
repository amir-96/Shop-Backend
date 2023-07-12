import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'prisma/prisma.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'J*1s2Ds5&f}-s1#C/B(3DF*!&',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
