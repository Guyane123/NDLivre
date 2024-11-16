// AuthService.ts

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
// ... other imports

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // For Local Strategy
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Comparing hashed password.
      // Remove password before returning. Don't send it to the client.
      const { password, ...result } = user;
      return result;
    }
    return null; // Authentication failed.
  }

  // For Google Strategy
  async findOrCreateGoogleUser(profile: any): Promise<any> {
    const existingUser = await this.userService.findByEmail(profile.email);

    if (existingUser) {
      // Update user if needed (e.g., profile picture, display name).
      if (profile.picture && existingUser.image !== profile.picture) {
        existingUser.image = profile.picture;
        await this.userService.update(existingUser._id, existingUser);
      }
      return existingUser;
    }

    const newUser = await this.userService.create({
      email: profile.email,
      pseudo: profile.displayName,
      image: profile.picture || null,

      // Any other relevant fields from Google profile
    });
    return newUser;
  }

  // For Apple Strategy
  /*async findOrCreateAppleUser(profile: any): Promise<any> {
    const existingUser = await this.userService.findByEmail(profile.email);

    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.userService.create({
      email: profile.email,
      : profile.name?.givenName || profile.displayName || null, // Apple might provide different name fields.
      // Other relevant fields you need. Apple's profile might not have a picture.
    });

    return newUser;
  }*/

  async createUser(
    pseudo: string,
    email: string,
    password: string,
    image: string,
  ) {
    const newUser = await this.userService.create({
      email: email,
      pseudo: pseudo,
      image: image,
      comments: [],
      likes: [],
      books: [],
    });
  }
  // ... other AuthService methods
}

/*async signIn(
username: string,
pass: string,
): Promise<{ access_token: string }> {
const user = await this.userService.findOne(username);
if (user?.password !== pass) {
  throw new UnauthorizedException();
}
const payload = { sub: user._id, username: user.pseudo };
return {
  access_token: await this.jwtService.signAsync(payload),
};
}*/

/*@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userService.findByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists._id,
      email: userExists.email,
    });
  }

  async registerUser(user: CreateUserDto) {
    try {
      const newUser = this.userService.create(user);

      return this.generateJwt({ sub: user._id, username: user.pseudo });
    } catch {
      throw new InternalServerErrorException();
    }
  }*/

/*async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.pseudo };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }*/
