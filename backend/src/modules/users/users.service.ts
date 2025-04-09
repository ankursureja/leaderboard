import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/entities/activity.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepo: Repository<Users>,
        @InjectRepository(Activity) private activityRepo: Repository<Activity>
    ) {}

    async recalculateLeaderboard(): Promise<any> {
        try {
            const users = await this.userRepo.find({ relations: ['activities'] });

            for (const user of users) {
                user.totalPoints = user.activities.length * 20;
            }

            const sorted = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

            let currentRank = 1;
            let prevPoints = null;
            let tieCount = 0;

            for (let i = 0; i < sorted.length; i++) {
                const user = sorted[i];
                if (user.totalPoints === prevPoints) {
                    user.rank = currentRank;
                    tieCount++;
                } else {
                    currentRank = currentRank + tieCount;
                    user.rank = currentRank;
                    tieCount = 1;
                }
                prevPoints = user.totalPoints;
            }

            await this.userRepo.save(sorted);
            return sorted;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getLeaderboard(search?: number, filter?: 'day' | 'month' | 'year') {
        try {
            const query = this.userRepo.createQueryBuilder('user').leftJoinAndSelect('user.activities', 'activity');
            console.log(search);
            // Search by name
            // if (search) {
            //     query.andWhere('LOWER(user.firstName) LIKE LOWER(:name) OR LOWER(user.lastName) LIKE LOWER(:name)', {
            //         name: `%${search}%`,
            //     });
            // }

            // search by userid
            if (search) {
                query.andWhere('user.id = :user', { user: search });
            }

            // filter by day, month and years
            if (filter) {
                const now = new Date();
                let fromDate: Date;

                if (filter === 'day') {
                    fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                } else if (filter === 'month') {
                    fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
                } else if (filter === 'year') {
                    fromDate = new Date(now.getFullYear(), 0, 1);
                }
                console.log(fromDate);

                query.andWhere('activity.createdAt >= :fromDate', { fromDate });
            }

            const users = await query.getMany();

            // Recalculate points for the current filter
            const ranked = users
                .map((user) => ({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    totalPoints: user.activities.reduce((acc, a) => acc + a.points, 0),
                    rank: user.rank,
                }))
                .sort((a, b) => b.totalPoints - a.totalPoints)
                .map((user, index, arr) => {
                    const prev = arr[index - 1];
                    const sameAsPrev = prev && user.totalPoints === prev.totalPoints;
                    const rank = sameAsPrev ? prev.rank : index + 1;
                    return { ...user, rank };
                });
            console.log(ranked);
            return ranked;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
