import { IsString } from 'class-validator';

export class RemoveImageParams {
  @IsString()
  portfolioId: string;
  @IsString()
  imageId: string;
}
