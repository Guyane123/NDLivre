import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import Google from 'passport-google-oauth2';
import AzureAdOAuth2Strategy from 'passport-azure-ad-oauth2';
// ... other imports

@Injectable()
export class AzureStrategy extends PassportStrategy(
  AzureAdOAuth2Strategy as any,
) {
  constructor(private authService: AuthService) {
    super({
      CLIENT_ID: process.env.AZURE_CLIENT_ID,
      CLIENT_SECRET: process.env.AZURE_CLIENT_ID,
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
