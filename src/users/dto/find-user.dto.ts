import { IsEmail } from 'class-validator';

export class FindOneByEmailDto {
  @IsEmail()
  email: string;
}
