import { Portfolio } from 'src/portfolios/portfolios.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne((_type) => Portfolio, (portfolio) => portfolio.images, {
    eager: true,
  })
  portfolio: Portfolio;

  @CreateDateColumn()
  created_at: Date;
}
