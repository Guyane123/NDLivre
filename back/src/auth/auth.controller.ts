import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import passport from 'passport';
import { LocalGuard } from './local.guard';
import { AzureGuard } from './azure.guard';

@Controller('auth')
export class AuthController {
  // ...

  @Get('login')
  @UseGuards(AuthGuard('local')) // Local login route
  localLogin(@Req() req) {
    return req.user; // req.user will contain the authenticated user.
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    passport.authenticate('google', { failureRedirect: '/login' });
    return { message: 'Google login successful', user: req.user };
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth(@Req() req) {}

  @Get('azure')
  @UseGuards(AuthGuard('azure'))
  async azureAuth(@Req() req) {}

  @Get('callback/azure')
  @UseGuards(AuthGuard('azure'))
  azureAuthRedirect(@Req() req) {
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' });
    return { message: 'Azure login successful', user: req.user };
  }

  @Get('apple/redirect')
  @UseGuards(AuthGuard('apple'))
  appleAuthRedirect(@Req() req) {
    return { message: 'Apple login successful', user: req.user };
  }
}
