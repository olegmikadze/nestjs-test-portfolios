import { Controller, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Delete('/me')
  async deleteProfile(@GetUser() user: User): Promise<void> {
    console.log(
      '🚀 : file: users.controller.ts:14 : UsersController : deleteProfile : user',
      user,
    );
    await this.usersService.deleteMe(user);
  }
}
