import { Injectable } from '@nestjs/common';
import {
  EpisodeReadModelRepository,
  GetAllParams,
  PaginatedEpisodes,
} from '../../app/interface/episode-read-model.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { EpisodeEntity } from '../../domain/entity/episode.entity';
import { MikroORMEpisodeEntity } from './mikro-orm-episode.entity';

// it'd be better to use the plain SQL to provide fast read-model, although to speed-up the task completion, ORM has been used
@Injectable()
export class MikroORMEpisodeReadModelRepository
  implements EpisodeReadModelRepository
{
  constructor(private readonly em: EntityManager) {}

  public async getById(episodeId: string): Promise<EpisodeEntity | null> {
    const character = await this.em.findOne(MikroORMEpisodeEntity, {
      id: episodeId,
    });

    return character;
  }

  public async getAll(params: GetAllParams): Promise<PaginatedEpisodes> {
    const [characters, totalCount] = await this.em.findAndCount(
      MikroORMEpisodeEntity,
      {},
      {
        limit: params.pagination.perPage,
        offset: (params.pagination.page - 1) * params.pagination.perPage,
      },
    );

    return {
      records: characters,
      metadata: {
        page: params.pagination.page,
        perPage: params.pagination.perPage,
        totalPages: Math.ceil(totalCount / params.pagination.perPage),
      },
    };
  }
}
