import { Entity, Column } from 'typeorm';
import { Base } from './Base';

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

@Entity()
export class Task extends Base {
  @Column({
    length: 100
    })
    title: string;

  @Column({
    length: 100,
    nullable: true,
    default: TaskStatus.OPEN
    })
    status: string;
}
