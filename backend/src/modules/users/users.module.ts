import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from 'src/entities/user.entity';
import { Activity } from 'src/entities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Activity])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
