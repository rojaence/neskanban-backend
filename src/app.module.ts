import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { BcryptService } from './common/services/bcrypt/bcrypt.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, BcryptService],
})
export class AppModule {}
