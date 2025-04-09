import { Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseMap } from 'src/interceptor/types';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getLeaderboard(@Query('filter') filter?: 'day' | 'month' | 'year', @Query('search') search?: number) {
        console.log(search);
        const data = await this.userService.getLeaderboard(search, filter);
        return ResponseMap(data);
    }

    @Post('recalculate')
    async recalculate(): Promise<any> {
        try {
            const data = await this.userService.recalculateLeaderboard();
            return ResponseMap(data);
        } catch (error) {
            throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
