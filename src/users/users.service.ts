import {
  ConflictException,
  HttpException,
  HttpStatus,
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
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(findOneByemailDto: FindOneByEmailDto): Promise<User> {
    const { email } = findOneByemailDto;

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const userExists = await this.usersRepository.findOneBy({ email });

    if (userExists)
      throw new UnprocessableEntityException('User already exists');

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

  async removeProfile(user: User): Promise<void> {
    await this.usersRepository.remove(user);
  }
}
