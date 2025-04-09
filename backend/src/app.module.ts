import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformInterceptor } from './interceptor/response.interceptor';
import { ErrorsInterceptor } from './interceptor/error.interceptor';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, SeederModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseTransformInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorsInterceptor,
        },
    ],
})
export class AppModule {}
