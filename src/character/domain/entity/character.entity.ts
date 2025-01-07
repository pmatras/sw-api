import { EpisodeDto } from '../../../episode/public/episode.dto';
import { PlanetDto } from '../../../planet/public/planet.dto';
import { CharacterId } from '../../public/character.id';

export class CharacterEntity {
  id: CharacterId;
  name: string;
  episodes: EpisodeDto[];
  planet: PlanetDto | null;
  createdAt: Date;
  modifiedAt: Date;
}
