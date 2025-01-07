import { Injectable, Logger } from '@nestjs/common';
import { CharacterReadModelRepository } from '../interface/character-read-model.repository';
import { CharacterId } from '../../public/character.id';
import {
  CharacterDto,
  PaginatedCharacterDto,
} from '../../public/character.dto';
import { CharacterMapper } from '../mapper/character.mapper';
import { PaginationOptions } from '../../../shared/type/pagination.interface';

export interface GetAllQuery {
  pagination: PaginationOptions;
}

@Injectable()
export class CharacterReadModel {
  private readonly logger = new Logger(CharacterReadModel.name);

  constructor(
    private readonly repository: CharacterReadModelRepository,
    private readonly mapper: CharacterMapper,
  ) {}

  public async getById(id: CharacterId): Promise<CharacterDto | null> {
    try {
      const character = await this.repository.getById(id);

      return this.mapper.toDto(character);
    } catch (error) {
      this.logger.error(`Failed to get by id (id=${id}):`, error);

      throw error;
    }
  }

  public async getAll(query: GetAllQuery): Promise<PaginatedCharacterDto> {
    try {
      const characters = await this.repository.getAll(query);

      return {
        records: this.mapper.toDtos(characters.records),
        metadata: characters.metadata,
      };
    } catch (error) {
      this.logger.error(`Failed to get all:`, error);

      throw error;
    }
  }
}
