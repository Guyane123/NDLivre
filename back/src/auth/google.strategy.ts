import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import Google from 'passport-google-oauth2';
import GoogleOAuth2Strategy from 'passport-google-oauth20';
// ... other imports

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleOAuth2Strategy as any,
) {
  constructor(private authService: AuthService) {
    super({
      CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhosy:3000/auth/callback/google',
    });
  }

  async validate(email, password): Promise<any> {
    const user = await this.authService.validateUser(email, password); // Implement this method in AuthService
    if (!user) {
      return new UnauthorizedException(); // Or throw an exception if you prefer
    }
    return user;
  }
}
