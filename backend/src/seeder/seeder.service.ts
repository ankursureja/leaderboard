import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Users } from 'src/entities/user.entity';
import { Activity } from 'src/entities/activity.entity';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Users) private userRepo: Repository<Users>,
        @InjectRepository(Activity) private activityRepo: Repository<Activity>
    ) {}

    async seedDummyData() {
        console.log('⏳ Seeding database...');

        //await this.activityRepo.delete({});
        //await this.userRepo.delete({});

        for (let i = 0; i < 20; i++) {
            const user = this.userRepo.create({
                firstName: faker.person.fullName(),
                lastName: faker.person.fullName(),
                createdAt: faker.date.recent({ days: 30 }),
                totalPoints: 0,
                rank: 0,
            });

            const savedUser = await this.userRepo.save(user);

            const activityCount = Math.floor(Math.random() * 10) + 1;
            const activities = [];

            for (let j = 0; j < activityCount; j++) {
                activities.push(
                    this.activityRepo.create({
                        user: savedUser,
                        points: 20,
                        createdAt: faker.date.recent({ days: 30 }),
                    })
                );
            }

            await this.activityRepo.save(activities);
            console.log(`👤 User ${savedUser.id} with ${activityCount} activities`);
        }

        console.log('✅ Seeder finished inserting 20 users');
    }
}
