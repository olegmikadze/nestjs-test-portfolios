import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { AddPortfolioDto } from './dto/add-portfolio.dto';
import { Portfolio } from './portfolios.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private portfoliosRepository: Repository<Portfolio>,
  ) {}

  async addPortfolio(
    addPortfolioDto: AddPortfolioDto,
    user: User,
  ): Promise<Portfolio> {
    const { name } = addPortfolioDto;

    const portfolioExists = await this.portfoliosRepository.findOneBy({ name });

    if (portfolioExists)
      throw new ConflictException('Portfolio already exists with such name!');

    const portfolio = await this.portfoliosRepository.create({
      ...addPortfolioDto,
      user,
    });

    await this.portfoliosRepository.save(portfolio);

    return portfolio;
  }

  async deletePortfolioById(id: string, user: User): Promise<void> {
    const portfolio = await this.portfoliosRepository
      .createQueryBuilder('portfolio')
      .where({ user })
      .andWhere({ id })
      .getOne();

    if (!portfolio)
      throw new NotFoundException('This user doesnt own such portfolio!');

    await this.portfoliosRepository.remove(portfolio);
  }
}
