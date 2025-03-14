import { User } from '../../users/entities/user.entity';
import { Breed } from '../../breed/entities/breed.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,} from 'typeorm';
@Entity()
export class Cat {
  //@PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
  
  @DeleteDateColumn()
  deletedAd: Date;

  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true,
  })
  breed: Breed;

  @ManyToOne(() => User)
  @JoinColumn({ name:'userEmail', referencedColumnName: 'email', })
  user: User;

  @Column()
  userEmail: string;
}
