import {
  PaginationMetadata,
  PaginationOptions,
} from '../../../shared/type/pagination.interface';
import { PlanetEntity } from '../../domain/entity/planet.entity';

export interface GetAllParams {
  pagination: PaginationOptions;
}

export interface PaginatedPlanets {
  records: PlanetEntity[];
  metadata: PaginationMetadata;
}

export abstract class PlanetReadModelRepository {
  public abstract getById(planetId: string): Promise<PlanetEntity | null>;
  public abstract getAll(params: GetAllParams): Promise<PaginatedPlanets>;
}
