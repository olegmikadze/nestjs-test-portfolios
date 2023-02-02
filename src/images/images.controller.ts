import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/users.entity';
import { Image } from './images.entity';
import { ImagesService } from './images.service';

@Controller('images')
// @UseGuards(AuthGuard())
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('/')
  async getImages(): Promise<Image[]> {
    return await this.imagesService.getImages();
  }
}
