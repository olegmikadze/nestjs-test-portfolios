import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto): Promise<{ accessToken: string }> {
    const signUpUser = await this.userService.createUser(authDto);

    return await this.authorizeAndSignIn(signUpUser, authDto);
  }

  async signIn(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { email } = authDto;

    const user = await this.userService.findOneByEmail({ email });

    if (!user) throw new NotFoundException('User was not found!');

    return await this.authorizeAndSignIn(user, authDto);
  }

  async authorizeAndSignIn(
    user: User,
    authDto: AuthDto,
  ): Promise<{ accessToken: string }> {
    const compared = await bcrypt.compare(authDto.password, user.password);
    if (user && compared) {
      const payload: JwtPayload = {
        id: user.id,
        email: authDto.email,
        username: user.username,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
