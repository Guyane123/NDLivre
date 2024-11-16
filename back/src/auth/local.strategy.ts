import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import GoogleOAuth2Strategy from 'passport-google-oauth20';
// ... other imports

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({}); // Use email as the username field
  }

  async validate(email, password): Promise<any> {
    const user = await this.authService.validateUser(email, password); // Implement this method in AuthService
    if (!user) {
      return new UnauthorizedException(); // Or throw an exception if you prefer
    }
    return user;
  }
}
