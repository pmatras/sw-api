import { Migration } from '@mikro-orm/migrations';

export class Migration20250106173603_specify_join_column extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_episode_entity_id_foreign";`,
    );

    this.addSql(
      `alter table "episodes" add constraint "episodes_name_unique" unique ("name");`,
    );

    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_pkey";`,
    );

    this.addSql(
      `alter table "characters_episodes" rename column "episode_entity_id" to "episode_id";`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_episode_id_foreign" foreign key ("episode_id") references "episodes" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_pkey" primary key ("character_id", "episode_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_episode_id_foreign";`,
    );

    this.addSql(
      `alter table "episodes" drop constraint "episodes_name_unique";`,
    );

    this.addSql(
      `alter table "characters_episodes" drop constraint "characters_episodes_pkey";`,
    );

    this.addSql(
      `alter table "characters_episodes" rename column "episode_id" to "episode_entity_id";`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_episode_entity_id_foreign" foreign key ("episode_entity_id") references "episodes" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "characters_episodes" add constraint "characters_episodes_pkey" primary key ("character_id", "episode_entity_id");`,
    );
  }
}
