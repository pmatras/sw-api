import { Injectable } from '@nestjs/common';
import {
  CreateParams,
  DeleteParams,
  PlanetWriteModelRepository,
  UpdateParams,
} from '../../app/interface/planet-write-model.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { MikroORMPlanetEntity } from './mikro-orm-planet.entity';

@Injectable()
export class MikroORMPlanetWriteModelRepository
  implements PlanetWriteModelRepository
{
  constructor(private readonly em: EntityManager) {}

  public async create(params: CreateParams): Promise<boolean> {
    const planet = this.em.create(MikroORMPlanetEntity, {
      name: params.name,
    });

    await this.em.persistAndFlush(planet);

    return true;
  }

  public async update(params: UpdateParams): Promise<boolean> {
    const planet = await this.em.findOne(MikroORMPlanetEntity, params.id);

    if (!planet) {
      return false;
    }

    if (params.name) {
      planet.name = params.name;
    }

    planet.modifiedAt = new Date();

    await this.em.persistAndFlush(planet);

    return true;
  }
  public async delete(params: DeleteParams): Promise<boolean> {
    const planet = await this.em.findOne(MikroORMPlanetEntity, params.id);

    if (!planet) {
      return false;
    }

    await this.em.removeAndFlush(planet);

    return true;
  }
}
