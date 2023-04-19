import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'prisma/prisma.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'SaJ*(D6FYh58#a73&hS*2^A&*b1S',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
