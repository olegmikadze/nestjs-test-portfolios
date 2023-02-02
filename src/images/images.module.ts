import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from './images.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolios/portfolios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, Portfolio]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
