import { Cat } from '../../cats/entities/cat.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Breed {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cat, (Cat) => Cat.breed)
  cats: Cat[];
}
