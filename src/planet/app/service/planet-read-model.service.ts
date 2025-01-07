import { Injectable, Logger } from '@nestjs/common';
import { PaginationOptions } from '../../../shared/type/pagination.interface';
import { PlanetReadModelRepository } from '../interface/planet-read-model.repository';
import { PlanetMapper } from '../mapper/planet.mapper';
import { PlanetId } from '../../public/planet.id';
import { PaginatedPlanetDto, PlanetDto } from '../../public/planet.dto';

export interface GetAllQuery {
  pagination: PaginationOptions;
}

@Injectable()
export class PlanetReadModel {
  private readonly logger = new Logger(PlanetReadModel.name);

  constructor(
    private readonly repository: PlanetReadModelRepository,
    private readonly mapper: PlanetMapper,
  ) {}

  public async getById(id: PlanetId): Promise<PlanetDto | null> {
    try {
      const episode = await this.repository.getById(id);

      return this.mapper.toDto(episode);
    } catch (error) {
      this.logger.error(`Failed to get by id (id=${id}):`, error);

      throw error;
    }
  }

  public async getAll(query: GetAllQuery): Promise<PaginatedPlanetDto> {
    try {
      const planets = await this.repository.getAll(query);

      return {
        records: this.mapper.toDtos(planets.records),
        metadata: planets.metadata,
      };
    } catch (error) {
      this.logger.error(`Failed to get all:`, error);

      throw error;
    }
  }
}
