import { Portfolio } from 'src/portfolios/portfolios.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Portfolio, (portfolio) => portfolio.user, {
    eager: true,
  })
  portfolios: Portfolio[];
}
