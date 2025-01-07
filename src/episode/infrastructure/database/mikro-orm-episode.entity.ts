import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';

@Entity({ tableName: 'episodes' })
export class MikroORMEpisodeEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Property({ type: 'datetime', nullable: false, default: 'now()' })
  createdAt: Date;

  @Property({ type: 'datetime', nullable: false, default: 'now()' })
  modifiedAt: Date;

  [OptionalProps]?: 'id' | 'createdAt' | 'modifiedAt';
}
