import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true, // We can change to false on production
    logging: false,
};
