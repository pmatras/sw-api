import { Injectable } from '@nestjs/common';
import {
  CharacterWriteModelRepository,
  CreateParams,
  DeleteParams,
  UpdateParams,
} from '../../app/interface/character-write-model.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { MikroORMCharacterEntity } from './mikro-orm-character.entity';
import { MikroORMEpisodeEntity } from '../../../episode/infrastructure/database/mikro-orm-episode.entity';
import { MikroORMPlanetEntity } from '../../../planet/infrastructure/database/mikro-orm-planet.entity';

@Injectable()
export class MikroORMCharacterWriteModelRepository
  implements CharacterWriteModelRepository
{
  constructor(private readonly em: EntityManager) {}

  public async create(params: CreateParams): Promise<boolean> {
    const character = this.em.create(MikroORMCharacterEntity, {
      name: params.name,
    });

    if (params.episodesIds?.length) {
      character.episodes.add(
        params.episodesIds.map((episodeId) =>
          this.em.getReference(MikroORMEpisodeEntity, episodeId),
        ),
      );
    }

    if (params.planetId) {
      character.planet = this.em.getReference(
        MikroORMPlanetEntity,
        params.planetId,
      );
    }

    await this.em.persistAndFlush(character);

    return true;
  }

  public async update(params: UpdateParams): Promise<boolean> {
    const character = await this.em.findOne(MikroORMCharacterEntity, params.id);

    if (!character) {
      return false;
    }

    if (params.name) {
      character.name = params.name;
    }

    if (params.episodesIds?.length) {
      character.episodes.add(
        params.episodesIds.map((episodeId) =>
          this.em.getReference(MikroORMEpisodeEntity, episodeId),
        ),
      );
    }

    if (params.planetId) {
      character.planet = this.em.getReference(
        MikroORMPlanetEntity,
        params.planetId,
      );
    }

    character.modifiedAt = new Date();

    await this.em.persistAndFlush(character);

    return true;
  }
  public async delete(params: DeleteParams): Promise<boolean> {
    const character = await this.em.findOne(MikroORMCharacterEntity, params.id);

    if (!character) {
      return false;
    }

    await this.em.removeAndFlush(character);

    return true;
  }
}
