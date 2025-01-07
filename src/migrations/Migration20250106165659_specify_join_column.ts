import { Migration } from '@mikro-orm/migrations';

export class Migration20250106165659_specify_join_column extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_character_entity_id_foreign";`,
    );

    this.addSql(
      `alter table "characters" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`,
    );
    this.addSql(
      `alter table "characters" alter column "created_at" set default now();`,
    );
    this.addSql(
      `alter table "characters" alter column "modified_at" type timestamptz using ("modified_at"::timestamptz);`,
    );
    this.addSql(
      `alter table "characters" alter column "modified_at" set default now();`,
    );

    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_pkey";`,
    );

    this.addSql(
      `alter table "characters_episodes" rename column "character_entity_id" to "character_id";`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_character_id_foreign" foreign key ("character_id") references "characters" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_pkey" primary key ("character_id", "episode_entity_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_character_id_foreign";`,
    );

    this.addSql(
      `alter table "characters" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`,
    );
    this.addSql(
      `alter table "characters" alter column "created_at" set default 'now()';`,
    );
    this.addSql(
      `alter table "characters" alter column "modified_at" type timestamptz using ("modified_at"::timestamptz);`,
    );
    this.addSql(
      `alter table "characters" alter column "modified_at" set default 'now()';`,
    );

    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_pkey";`,
    );

    this.addSql(
      `alter table "characters_episodes" rename column "character_id" to "character_entity_id";`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_character_entity_id_foreign" foreign key ("character_entity_id") references "characters" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_pkey" primary key ("character_entity_id", "episode_entity_id");`,
    );
  }
}
