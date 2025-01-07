import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';

// index not added as there is no filtering at all - in such case it'd be additional cost for each write/alter operation
@Entity({ tableName: 'planets' })
export class MikroORMPlanetEntity {
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
