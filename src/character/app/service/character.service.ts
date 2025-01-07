import { Injectable, Logger } from '@nestjs/common';
import { CharacterWriteModelRepository } from '../interface/character-write-model.repository';
import { CharacterId } from '../../public/character.id';

export interface CreateCommand {
  name: string;
  episodesIds?: string[];
  planetId?: string;
}

export interface UpdateCommand {
  id: CharacterId;
  name?: string;
  episodesIds?: string[];
  planetId?: string;
}

export interface DeleteCommand {
  id: CharacterId;
}

@Injectable()
export class CharacterService {
  private readonly logger = new Logger(CharacterService.name);

  constructor(private readonly repository: CharacterWriteModelRepository) {}

  public async create(command: CreateCommand): Promise<boolean> {
    try {
      return await this.repository.create(command);
    } catch (error) {
      this.logger.error(`Failed to create character:`, error);

      throw error;
    }
  }

  public async update(command: UpdateCommand): Promise<boolean> {
    // could check if any property apart from 'id' is defined to not involve database request if not needed
    try {
      return await this.repository.update(command);
    } catch (error) {
      this.logger.error(`Failed to update character:`, error);

      throw error;
    }
  }

  public async delete(command: DeleteCommand): Promise<boolean> {
    try {
      return await this.repository.delete(command);
    } catch (error) {
      this.logger.error(`Failed to delete character:`, error);

      throw error;
    }
  }
}
