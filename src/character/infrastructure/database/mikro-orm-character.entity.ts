import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { MikroORMEpisodeEntity } from '../../../episode/infrastructure/database/mikro-orm-episode.entity';
import { MikroORMPlanetEntity } from '../../../planet/infrastructure/database/mikro-orm-planet.entity';
import { Cascade, OptionalProps } from '@mikro-orm/core';
import { CharacterId } from '../../public/character.id';

@Entity({ tableName: 'characters' })
export class MikroORMCharacterEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: CharacterId;

  @Property({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @ManyToMany(() => MikroORMEpisodeEntity, undefined, {
    joinColumn: 'character_id',
    inverseJoinColumn: 'episode_id',
    cascade: [Cascade.PERSIST, Cascade.MERGE],
  })
  episodes = new Collection<MikroORMEpisodeEntity>(this);

  @ManyToOne(() => MikroORMPlanetEntity, { nullable: true })
  planet: MikroORMPlanetEntity | null;

  @Property({ type: 'datetime', nullable: false, defaultRaw: 'now()' })
  createdAt: Date;

  @Property({ type: 'datetime', nullable: false, defaultRaw: 'now()' })
  modifiedAt: Date;

  [OptionalProps]?: 'id' | 'episodes' | 'planet' | 'createdAt' | 'modifiedAt';
}
