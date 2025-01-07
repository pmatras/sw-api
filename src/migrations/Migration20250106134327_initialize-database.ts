import { Migration } from '@mikro-orm/migrations';

export class Migration20250106134327_initialize_database extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "episodes" ("id" uuid not null, "name" varchar(255) not null, "created_at" timestamptz not null default 'now()', "modified_at" timestamptz not null default 'now()', constraint "episodes_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "planets" ("id" uuid not null, "name" varchar(255) not null, "created_at" timestamptz not null default 'now()', "modified_at" timestamptz not null default 'now()', constraint "planets_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "characters" ("id" uuid not null, "name" varchar(255) not null, "planet_id" uuid not null, "created_at" timestamptz not null default 'now()', "modified_at" timestamptz not null default 'now()', constraint "characters_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "characters_episodes" ("character_entity_id" uuid not null, "episode_entity_id" uuid not null, constraint "characters_episodes_pkey" primary key ("character_entity_id", "episode_entity_id"));`,
    );

    this.addSql(
      `alter table "characters" add constraint "characters_planet_id_foreign" foreign key ("planet_id") references "planets" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_character_entity_id_foreign" foreign key ("character_entity_id") references "characters" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_episode_entity_id_foreign" foreign key ("episode_entity_id") references "episodes" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_episode_entity_id_foreign";`,
    );

    this.addSql(
      `alter table "characters" drop constraint "characters_planet_id_foreign";`,
    );

    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_character_entity_id_foreign";`,
    );

    this.addSql(`drop table if exists "episodes" cascade;`);

    this.addSql(`drop table if exists "planets" cascade;`);

    this.addSql(`drop table if exists "characters" cascade;`);

    this.addSql(`drop table if exists "characters_episodes" cascade;`);
  }
}
