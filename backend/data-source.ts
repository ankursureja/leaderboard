import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './src/seeder/main.seeder';
import { Users } from 'src/entities/user.entity';
import { Activity } from 'src/entities/activity.entity';

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    entities: [Users, Activity],
    seeds: [MainSeeder], // 👈 from typeorm-extension
} as DataSourceOptions & SeederOptions); // ✅ FIXED HERE
