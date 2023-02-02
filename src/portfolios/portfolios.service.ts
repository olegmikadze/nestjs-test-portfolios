import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
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

    const duplicatedPort = await this.portfoliosRepository.findOneBy({ name });

    if (duplicatedPort)
      throw new UnprocessableEntityException(
        'Portfolio already exists with such name!',
      );

    const port = await this.portfoliosRepository.create({
      ...addPortfolioDto,
      user,
    });

    await this.portfoliosRepository.save(port);

    return port;
  }

  async deletePortfolioById(id: string, user: User): Promise<void> {
    const portfolioToDelete = await this.portfoliosRepository
      .createQueryBuilder('portfolio')
      .where({ user })
      .andWhere({ id })
      .getOne();

    if (!portfolioToDelete)
      throw new NotFoundException('Portfolio of this user waas not found');

    await this.portfoliosRepository.remove(portfolioToDelete);
  }
}
