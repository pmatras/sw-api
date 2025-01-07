import { PaginationMetadata } from '../../shared/type/pagination.interface';
import { EpisodeId } from './episode.id';

export class EpisodeDto {
  id: EpisodeId;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}

export class PaginatedEpisodeDto {
  records: EpisodeDto[];
  metadata: PaginationMetadata;
}
