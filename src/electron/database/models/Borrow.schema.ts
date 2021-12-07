import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BorrowRenovation } from './BorrowRenovation.schema';
import { Publisher } from './Publisher.schema';
import { User } from './User.schema';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  edition: number;

  @Column({ type: 'date' })
  borrow: string;

  @Column({ type: 'date' })
  estimatedReturn: string;

  @Column({ type: 'date', nullable: true })
  returnedAt: string;

  @Column()
  status: number;

  @Column({ default: false })
  isReserva: boolean;

  @Column()
  titlePublisherId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user: User;

  @ManyToOne(() => Publisher, (publisher) => publisher.borrows)
  publisher: Publisher;

  @OneToMany(() => BorrowRenovation, (renovation) => renovation.borrow)
  renovations: BorrowRenovation[];
}