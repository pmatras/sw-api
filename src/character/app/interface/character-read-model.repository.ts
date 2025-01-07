import {
  PaginationMetadata,
  PaginationOptions,
} from '../../../shared/type/pagination.interface';
import { CharacterEntity } from '../../domain/entity/character.entity';

export interface GetAllParams {
  pagination: PaginationOptions;
}

export interface PaginatedCharacters {
  records: CharacterEntity[];
  metadata: PaginationMetadata;
}

export abstract class CharacterReadModelRepository {
  public abstract getById(characterId: string): Promise<CharacterEntity | null>;
  public abstract getAll(params: GetAllParams): Promise<PaginatedCharacters>;
}
