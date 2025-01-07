import { plainToInstance } from 'class-transformer';
import { EpisodeEntity } from '../../domain/entity/episode.entity';
import { EpisodeDto } from '../../public/episode.dto';

export class EpisodeMapper {
  public toDto(entity: null): null;
  public toDto(entity: EpisodeEntity): EpisodeDto;
  public toDto(entity: EpisodeEntity | null): EpisodeDto | null;
  public toDto(entity: EpisodeEntity | null): EpisodeDto | null {
    if (!entity) {
      return null;
    }

    return plainToInstance(EpisodeDto, entity);
  }

  public toDtos(entities: EpisodeEntity[]): EpisodeDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
