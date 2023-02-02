import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolios/portfolios.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateAndUploadImageDto } from './dto/create-image.dto';
import { Image } from './images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    @InjectRepository(Portfolio)
    private portfoliosRepository: Repository<Portfolio>,
  ) {}

  async getImages() {
    return await this.imagesRepository.find();
  }

  async createAndUpload(
    createAndUploadImageDto: CreateAndUploadImageDto,
    user: User,
    portfolioId: string,
  ) {
    const portfolio = await this.portfoliosRepository.findOneBy({
      id: portfolioId,
      user,
    });

    if (!portfolio)
      throw new UnprocessableEntityException('You dont have such portfolio');

    const image = await this.imagesRepository.create({
      ...createAndUploadImageDto,
      portfolio,
    });

    await this.imagesRepository.save(image);

    return image;
  }
}
