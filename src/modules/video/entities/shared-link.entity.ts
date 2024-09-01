import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class SharedLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => Video, (video) => video.id)
  video: Video;
}