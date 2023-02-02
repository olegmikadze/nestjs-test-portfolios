import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/images/images.entity';
import { ImagesService } from 'src/images/images.service';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio } from './portfolios.entity';
import { PortfoliosService } from './portfolios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio, Image]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PortfoliosController],
  providers: [PortfoliosService, ImagesService],
})
export class PortfoliosModule {}
