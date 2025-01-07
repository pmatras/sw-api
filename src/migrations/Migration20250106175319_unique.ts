import { Migration } from '@mikro-orm/migrations';

export class Migration20250106175319_unique_index extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "characters" add constraint "characters_name_unique" unique ("name");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "characters" drop constraint "characters_name_unique";`,
    );
  }
}
