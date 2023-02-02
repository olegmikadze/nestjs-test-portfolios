import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.entity';
import { ImagesModule } from './images/images.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ImagesModule,
    PortfoliosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
