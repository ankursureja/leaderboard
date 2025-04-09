// src/seeder/main.seeder.ts
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Users } from 'src/entities/user.entity';

export class MainSeeder implements Seeder {
    async run(dataSource: DataSource): Promise<any> {
        const repo = dataSource.getRepository(Users);

        await repo.insert([
            {
                firstName: 'John',
                lastName: 'Doe',
                totalPoints: 150,
                rank: 1,
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                totalPoints: 120,
                rank: 2,
            },
        ]);
    }
}
