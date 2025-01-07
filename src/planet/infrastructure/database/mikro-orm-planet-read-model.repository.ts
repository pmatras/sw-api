import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PlanetId } from '../../public/planet.id';
import { PlanetEntity } from '../../domain/entity/planet.entity';
import {
  GetAllParams,
  PaginatedPlanets,
  PlanetReadModelRepository,
} from '../../app/interface/planet-read-model.repository';
import { MikroORMPlanetEntity } from './mikro-orm-planet.entity';

// it'd be better to use the plain SQL to provide fast read-model, although to speed-up the task completion, ORM has been used
@Injectable()
export class MikroORMPlanetReadModelRepository
  implements PlanetReadModelRepository
{
  constructor(private readonly em: EntityManager) {}

  public async getById(planetId: PlanetId): Promise<PlanetEntity | null> {
    const planet = await this.em.findOne(MikroORMPlanetEntity, {
      id: planetId,
    });

    return planet;
  }

  public async getAll(params: GetAllParams): Promise<PaginatedPlanets> {
    const [planets, totalCount] = await this.em.findAndCount(
      MikroORMPlanetEntity,
      {},
      {
        limit: params.pagination.perPage,
        offset: (params.pagination.page - 1) * params.pagination.perPage,
      },
    );

    return {
      records: planets,
      metadata: {
        page: params.pagination.page,
        perPage: params.pagination.perPage,
        totalPages: Math.ceil(totalCount / params.pagination.perPage),
      },
    };
  }
}
