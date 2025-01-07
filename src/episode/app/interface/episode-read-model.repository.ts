import {
  PaginationMetadata,
  PaginationOptions,
} from '../../../shared/type/pagination.interface';
import { EpisodeEntity } from '../../domain/entity/episode.entity';

export interface GetAllParams {
  pagination: PaginationOptions;
}

export interface PaginatedEpisodes {
  records: EpisodeEntity[];
  metadata: PaginationMetadata;
}

export abstract class EpisodeReadModelRepository {
  public abstract getById(characterId: string): Promise<EpisodeEntity | null>;
  public abstract getAll(params: GetAllParams): Promise<PaginatedEpisodes>;
}
