import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
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
    return await this.imagesRepository.find({ order: { created_at: 'DESC' } });
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

    if (!portfolio) throw new NotFoundError('User doesnt own such portfolio!');

    const image = await this.imagesRepository.create({
      ...createAndUploadImageDto,
      portfolio,
    });

    await this.imagesRepository.save(image);

    return image;
  }

  async removeImageFromPortfolio(
    portfolioId: string,
    imageId: string,
    user: User,
  ) {
    const portfolio = await this.portfoliosRepository.findOneBy({
      id: portfolioId,
      user,
    });

    if (!portfolio)
      throw new NotFoundException('This user doesnt own such portfolio');

    const image = await this.imagesRepository.findOneBy({
      id: imageId,
      portfolio,
    });

    if (!image)
      throw new NotFoundException('This portfolio doesnt own such image');

    await this.imagesRepository.remove(image);
  }
}
