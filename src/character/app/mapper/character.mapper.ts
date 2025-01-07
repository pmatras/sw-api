import { plainToInstance } from 'class-transformer';
import { CharacterDto } from '../../public/character.dto';
import { CharacterEntity } from '../../domain/entity/character.entity';

export class CharacterMapper {
  public toDto(entity: null): null;
  public toDto(entity: CharacterEntity): CharacterDto;
  public toDto(entity: CharacterEntity | null): CharacterDto | null;
  public toDto(entity: CharacterEntity | null): CharacterDto | null {
    if (!entity) {
      return null;
    }

    return plainToInstance(CharacterDto, entity);
  }

  public toDtos(entities: CharacterEntity[]): CharacterDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
