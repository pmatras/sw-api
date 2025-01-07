import { Injectable } from '@nestjs/common';
import {
  EpisodeWriteModelRepository,
  CreateParams,
  DeleteParams,
  UpdateParams,
} from '../../app/interface/episode-write-model.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { MikroORMEpisodeEntity } from './mikro-orm-episode.entity';

@Injectable()
export class MikroORMEpisodeWriteModelRepository
  implements EpisodeWriteModelRepository
{
  constructor(private readonly em: EntityManager) {}

  public async create(params: CreateParams): Promise<boolean> {
    const character = this.em.create(MikroORMEpisodeEntity, {
      name: params.name,
    });

    await this.em.persistAndFlush(character);

    return true;
  }

  public async update(params: UpdateParams): Promise<boolean> {
    const episode = await this.em.findOne(MikroORMEpisodeEntity, params.id);

    if (!episode) {
      return false;
    }

    if (params.name) {
      episode.name = params.name;
    }

    episode.modifiedAt = new Date();

    await this.em.persistAndFlush(episode);

    return true;
  }
  public async delete(params: DeleteParams): Promise<boolean> {
    const episode = await this.em.findOne(MikroORMEpisodeEntity, params.id);

    if (!episode) {
      return false;
    }

    await this.em.removeAndFlush(episode);

    return true;
  }
}
