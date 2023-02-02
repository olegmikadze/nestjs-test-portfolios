import { Controller, Get } from '@nestjs/common';
import { Image } from './images.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('/')
  async getImages(): Promise<Image[]> {
    return await this.imagesService.getImages();
  }
}
