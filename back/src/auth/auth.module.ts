import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import * as process from 'node:process';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AzureStrategy } from './azure.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],

  //GUARD ALL ROUTES (use @Public())
  //providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  //PUBLIC ALL ROUTES(use useGuards(AuthGuard))
  providers: [AuthService, LocalStrategy, AzureStrategy],
  controllers: [AuthController],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
