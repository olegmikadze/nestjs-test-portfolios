import { Exclude } from 'class-transformer';
import { Image } from 'src/images/images.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne((_type) => User, (user) => user.portfolios, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany((_type) => Image, (image) => image.portfolio, {
    eager: false,
  })
  images: Image[];
}
