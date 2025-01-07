import { EpisodeDto } from '../../episode/public/episode.dto';
import { PlanetDto } from '../../planet/public/planet.dto';
import { PaginationMetadata } from '../../shared/type/pagination.interface';
import { CharacterId } from './character.id';

export class CharacterDto {
  id: CharacterId;
  name: string;
  episodes: EpisodeDto[];
  planet: PlanetDto | null;
  createdAt: Date;
  modifiedAt: Date;
}

export class PaginatedCharacterDto {
  records: CharacterDto[];
  metadata: PaginationMetadata;
}
