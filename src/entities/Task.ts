import { Entity, Column } from 'typeorm';
import { Base } from './Base';

@Entity()
export class Task extends Base {
  @Column({
    length: 100
    })
    title: string;
}
