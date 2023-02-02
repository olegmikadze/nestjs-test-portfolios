import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneByEmailDto } from './dto/find-user.dto';
import { DeleteMeDto } from './dto/delete-me.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(findOneByemailDto: FindOneByEmailDto): Promise<User> {
    const { email } = findOneByemailDto;

    return await this.usersRepository.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const duplicatedUser = await this.findOneByEmail({ email });

    if (duplicatedUser)
      throw new UnprocessableEntityException(
        'User by such email already exists!',
      );

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.usersRepository.create({
      email,
      username: email.split('@')[0],
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async deleteMe(user: User): Promise<void> {
    await this.usersRepository.remove(user);
  }
}
