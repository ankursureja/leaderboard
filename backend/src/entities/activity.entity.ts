import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', name: 'points', nullable: false, default: 20 })
    points: number;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @ManyToOne(() => Users, (user) => user.activities, { onDelete: 'CASCADE', nullable: false })
    user: Users;
}
