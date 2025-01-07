import { EpisodeId } from '../../public/episode.id';

export class EpisodeEntity {
  id: EpisodeId;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}
