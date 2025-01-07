import { Migration } from '@mikro-orm/migrations';

export class Migration20250106142232_nullable_foreign_key extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "characters" drop constraint "characters_planet_id_foreign";`,
    );

    this.addSql(
      `alter table "characters" alter column "planet_id" drop default;`,
    );
    this.addSql(
      `alter table "characters" alter column "planet_id" type uuid using ("planet_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "characters" alter column "planet_id" drop not null;`,
    );
    this.addSql(
      `alter table "characters" add constraint "characters_planet_id_foreign" foreign key ("planet_id") references "planets" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "characters" drop constraint "characters_planet_id_foreign";`,
    );

    this.addSql(
      `alter table "characters" alter column "planet_id" drop default;`,
    );
    this.addSql(
      `alter table "characters" alter column "planet_id" type uuid using ("planet_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "characters" alter column "planet_id" set not null;`,
    );
    this.addSql(
      `alter table "characters" add constraint "characters_planet_id_foreign" foreign key ("planet_id") references "planets" ("id") on update cascade;`,
    );
  }
}
