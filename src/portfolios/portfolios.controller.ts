import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateAndUploadImageDto } from 'src/images/dto/create-image.dto';
import { RemoveImageParams } from 'src/images/dto/remove-image.dto';
import { Image } from 'src/images/images.entity';
import { ImagesService } from 'src/images/images.service';
import { User } from 'src/users/users.entity';
import { AddPortfolioDto } from './dto/add-portfolio.dto';
import { Portfolio } from './portfolios.entity';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
@UseGuards(AuthGuard())
export class PortfoliosController {
  constructor(
    private portfoliosService: PortfoliosService,
    private imagesService: ImagesService,
  ) {}

  @Post('add')
  addPortfolio(
    @Body() addportfolioDto: AddPortfolioDto,
    @GetUser() user: User,
  ): Promise<Portfolio> {
    return this.portfoliosService.addPortfolio(addportfolioDto, user);
  }

  @Delete('/:id')
  async deletePortfolio(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.portfoliosService.deletePortfolioById(id, user);
  }

  @Post('/:id/image')
  async createAndUploadImage(
    @Body() createAndUploadImageDto: CreateAndUploadImageDto,
    @GetUser() user: User,
    @Param('id') portfolioId: string,
  ): Promise<Image> {
    return await this.imagesService.createAndUpload(
      createAndUploadImageDto,
      user,
      portfolioId,
    );
  }

  @Delete('/:portfolioId/image/:imageId')
  async removeImageFromPortfolio(
    @GetUser() user: User,
    @Param() { portfolioId, imageId }: RemoveImageParams,
  ): Promise<void> {
    await this.imagesService.removeImageFromPortfolio(
      portfolioId,
      imageId,
      user,
    );
  }
}
