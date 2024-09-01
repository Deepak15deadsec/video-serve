import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'unknown.mp4' })
  filename: string;

  @Column()
  filepath: string;

  @Column()
  duration: number;

  @Column()
  size: number;
}