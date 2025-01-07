import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CharacterModule } from './character/character.module';
import { EpisodeModule } from './episode/episode.module';
import { PlanetModule } from './planet/planet.module';
import { Migrator } from '@mikro-orm/migrations';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      driver: PostgreSqlDriver,
      // normally some abstraction should be used
      clientUrl: process.env.DATABASE_URL,
      debug: true,
      extensions: [Migrator],
    }),
    CharacterModule,
    EpisodeModule,
    PlanetModule,
  ],
})
export class AppModule {}
