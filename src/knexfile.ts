import {dirname, join} from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import type _ from './environment.d.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  development: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
    pool: {
      min: 2,
      max: 5,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds/dev',
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: `${process.env.DATABASE_URL}`,
      ssl: {rejectUnauthorized: false},
    },
    pool: {
      min: 2,
      max: 5,
    },
    migrations: {
      directory: join(__dirname, '/migrations'),
      extension: 'js',
    },
    seeds: {
      directory: join(__dirname, '/seeds/dev'),
      extension: 'js',
    },
  },
}[process.env.NODE_ENV];
