import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Activity } from 'src/entities/activity.entity';
import { SeederService } from './seeder.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Activity])],
    providers: [SeederService],
    exports: [SeederService],
})
export class SeederModule {}
