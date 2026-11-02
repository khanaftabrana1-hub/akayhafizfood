import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  videoUrl: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnailUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}