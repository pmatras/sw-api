import { Injectable } from '@nestjs/common';
import {
  CharacterReadModelRepository,
  GetAllParams,
  PaginatedCharacters,
} from '../../app/interface/character-read-model.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { MikroORMCharacterEntity } from './mikro-orm-character.entity';
import { CharacterEntity } from '../../domain/entity/character.entity';
import { MikroORMCharacterMapper } from './mapper/mikro-orm-character.mapper';

// it'd be better to use the plain SQL to provide fast read-model, although to speed-up the task completion, ORM has been used
@Injectable()
export class MikroORMCharacterReadModelRepository
  implements CharacterReadModelRepository
{
  constructor(
    private readonly em: EntityManager,
    private readonly mapper: MikroORMCharacterMapper,
  ) {}

  public async getById(characterId: string): Promise<CharacterEntity | null> {
    const character = await this.em.findOne(
      MikroORMCharacterEntity,
      { id: characterId },
      {
        populate: ['episodes', 'planet'],
      },
    );

    return this.mapper.fromDatabase(character);
  }

  public async getAll(params: GetAllParams): Promise<PaginatedCharacters> {
    const [characters, totalCount] = await this.em.findAndCount(
      MikroORMCharacterEntity,
      {},
      {
        limit: params.pagination.perPage,
        offset: (params.pagination.page - 1) * params.pagination.perPage,
        populate: ['episodes', 'planet'],
      },
    );

    return {
      records: this.mapper.fromDatabases(characters),
      metadata: {
        page: params.pagination.page,
        perPage: params.pagination.perPage,
        totalPages: Math.ceil(totalCount / params.pagination.perPage),
      },
    };
  }
}
