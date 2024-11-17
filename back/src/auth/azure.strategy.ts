import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import Google from 'passport-google-oauth2';
import AzureAdStrategy, {
  BearerStrategy,
  OIDCStrategy,
} from 'passport-azure-ad';
// ... other imports

@Injectable()
export class AzureStrategy extends PassportStrategy(OIDCStrategy, 'azure') {
  constructor(private authService: AuthService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_ID,
      responseType: 'code',
      responseMode: 'query', // Or 'form_post'
      redirectUrl: 'http://localhost:3000/auth/callback/azure',
      scope: ['User.Read'],
      allowHttpForRedirectUrl: process.env.NODE_ENV === 'development', // Be cautious with this!
    });
  }

  async validate(
    profile: any,
    accesToken: string,
    refreshToken: string,
  ): Promise<any> {
    const user = await this.authService.findOrCreateAzureUser(
      profile,
      accesToken,
      refreshToken,
    ); // Implement this method in AuthService
    if (!user) {
      return new UnauthorizedException(); // Or throw an exception if you prefer
    }

    return user;
  }
}
