import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default {
  autoLoadEntities: true,
  entities: ['./dist/**/infrastructure/**/*.entity.js'],
  entitiesTs: ['./src/**/infrastructure/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  clientUrl: process.env.DATABASE_URL,
  debug: true,
  extensions: [Migrator],
};
