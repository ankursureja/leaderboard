import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { SeederService } from './seeder/seeder.service';
require('dotenv').config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('/api');
    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                const formatErrors = (errors: ValidationError[]) => {
                    return errors.map((error) => ({
                        field: error.property,
                        error: Object.values(error.constraints || {}).join(', '),
                        children: error.children?.length ? formatErrors(error.children) : undefined, // Handle nested errors
                    }));
                };

                return new BadRequestException(formatErrors(validationErrors));
            },
        })
    );

    // const seeder = app.get(SeederService);
    // await seeder.seedDummyData();

    // Serve Static Files
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
