import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { RoleGuard } from './guards/role.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, RoleGuard],
  imports: [PrismaModule],
})
export class UserModule {}
