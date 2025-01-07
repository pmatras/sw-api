import { plainToInstance } from 'class-transformer';
import { CharacterEntity } from '../../../domain/entity/character.entity';
import { MikroORMCharacterEntity } from '../mikro-orm-character.entity';

export class MikroORMCharacterMapper {
  public fromDatabase(entity: null): null;
  public fromDatabase(entity: MikroORMCharacterEntity): CharacterEntity;
  public fromDatabase(
    entity: MikroORMCharacterEntity | null,
  ): CharacterEntity | null;
  public fromDatabase(
    entity: MikroORMCharacterEntity | null,
  ): CharacterEntity | null {
    if (!entity) {
      return null;
    }

    return plainToInstance(CharacterEntity, {
      id: entity.id,
      name: entity.name,
      episodes: entity.episodes.getItems(),
      planet: entity.planet ?? null,
      createdAt: entity.createdAt,
      modifiedAt: entity.modifiedAt,
    });
  }

  public fromDatabases(entities: MikroORMCharacterEntity[]): CharacterEntity[] {
    return entities.map((entity) => this.fromDatabase(entity));
  }
}
