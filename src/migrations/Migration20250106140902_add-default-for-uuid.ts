import { Migration } from '@mikro-orm/migrations';

export class Migration20250106140902_add_default_for_uuid extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "episodes" alter column "id" drop default;`);
    this.addSql(
      `alter table "episodes" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "episodes" alter column "id" set default gen_random_uuid();`,
    );

    this.addSql(`alter table "planets" alter column "id" drop default;`);
    this.addSql(
      `alter table "planets" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "planets" alter column "id" set default gen_random_uuid();`,
    );

    this.addSql(`alter table "characters" alter column "id" drop default;`);
    this.addSql(
      `alter table "characters" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "characters" alter column "id" set default gen_random_uuid();`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "episodes" alter column "id" drop default;`);
    this.addSql(`alter table "episodes" alter column "id" drop default;`);
    this.addSql(
      `alter table "episodes" alter column "id" type uuid using ("id"::text::uuid);`,
    );

    this.addSql(`alter table "planets" alter column "id" drop default;`);
    this.addSql(`alter table "planets" alter column "id" drop default;`);
    this.addSql(
      `alter table "planets" alter column "id" type uuid using ("id"::text::uuid);`,
    );

    this.addSql(`alter table "characters" alter column "id" drop default;`);
    this.addSql(`alter table "characters" alter column "id" drop default;`);
    this.addSql(
      `alter table "characters" alter column "id" type uuid using ("id"::text::uuid);`,
    );
  }
}
