import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', name: 'firstName', nullable: false })
    firstName: string;

    @Column({ type: 'text', name: 'lastName', nullable: false })
    lastName: string;

    @Column({ type: 'int', name: 'totalPoints', nullable: true, default: 0 })
    totalPoints: number;

    @Column({ type: 'int', name: 'rank', nullable: true, default: 0 })
    rank: number;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date | null;

    @OneToMany(() => Activity, (activity) => activity.user)
    activities: Activity[];
}
