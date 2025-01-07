import { plainToInstance } from 'class-transformer';
import { PlanetDto } from '../../public/planet.dto';
import { PlanetEntity } from '../../domain/entity/planet.entity';

export class PlanetMapper {
  public toDto(entity: null): null;
  public toDto(entity: PlanetEntity): PlanetDto;
  public toDto(entity: PlanetEntity | null): PlanetDto | null;
  public toDto(entity: PlanetEntity | null): PlanetDto | null {
    if (!entity) {
      return null;
    }

    return plainToInstance(PlanetDto, entity);
  }

  public toDtos(entities: PlanetEntity[]): PlanetDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
