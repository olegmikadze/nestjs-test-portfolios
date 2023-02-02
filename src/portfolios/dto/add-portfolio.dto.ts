import { IsEmail, IsOptional } from 'class-validator';

export class AddPortfolioDto {
  @IsEmail()
  name: string;

  @IsEmail()
  @IsOptional()
  description: string;
}
