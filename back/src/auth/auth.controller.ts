import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  // ...

  @Post('login')
  //@UseGuards(AuthGuard('local')) // Local login route
  localLogin(@Req() req) {
    return req.user; // req.user will contain the authenticated user.
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return { message: 'Google login successful', user: req.user };
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth(@Req() req) {}

  @Get('azure')
  @UseGuards(AuthGuard('azure'))
  async azureAuth(@Req() req) {}

  @Get('azure/redirect')
  @UseGuards(AuthGuard('azure'))
  azureAuthRedirect(@Req() req) {
    return { message: 'Azure login successful', user: req.user };
  }

  @Get('apple/redirect')
  @UseGuards(AuthGuard('apple'))
  appleAuthRedirect(@Req() req) {
    return { message: 'Apple login successful', user: req.user };
  }
}
