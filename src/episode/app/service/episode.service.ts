import { Injectable, Logger } from '@nestjs/common';
import { EpisodeWriteModelRepository } from '../interface/episode-write-model.repository';
import { EpisodeId } from '../../public/episode.id';

export interface CreateCommand {
  name: string;
}

export interface UpdateCommand {
  id: EpisodeId;
  name?: string;
}

export interface DeleteCommand {
  id: EpisodeId;
}

@Injectable()
export class EpisodeService {
  private readonly logger = new Logger(EpisodeService.name);

  constructor(private readonly repository: EpisodeWriteModelRepository) {}

  public async create(command: CreateCommand): Promise<boolean> {
    try {
      return await this.repository.create(command);
    } catch (error) {
      this.logger.error(`Failed to create episode:`, error);

      throw error;
    }
  }

  public async update(command: UpdateCommand): Promise<boolean> {
    // could check if any property apart from 'id' is defined to not involve database request if not needed
    try {
      return await this.repository.update(command);
    } catch (error) {
      this.logger.error(`Failed to update episode:`, error);

      throw error;
    }
  }

  public async delete(command: DeleteCommand): Promise<boolean> {
    try {
      return await this.repository.delete(command);
    } catch (error) {
      this.logger.error(`Failed to delete episode:`, error);

      throw error;
    }
  }
}
