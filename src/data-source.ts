import {  DataSource } from 'typeorm';
import { User } from './entity/User';
import * as dotenv from 'dotenv';
import { Book } from './entity/Book';

dotenv.config({ path: './src/env/.env' });

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,        // Use environment variables
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User,Book],
    synchronize: true,
    logging: false,
  });