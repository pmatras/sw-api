import { Injectable, Logger } from '@nestjs/common';
import { EpisodeReadModelRepository } from '../interface/episode-read-model.repository';
import { EpisodeMapper } from '../mapper/episode.mapper';
import { PaginationOptions } from '../../../shared/type/pagination.interface';
import { EpisodeId } from '../../public/episode.id';
import { EpisodeDto, PaginatedEpisodeDto } from '../../public/episode.dto';

export interface GetAllQuery {
  pagination: PaginationOptions;
}

@Injectable()
export class EpisodeReadModel {
  private readonly logger = new Logger(EpisodeReadModel.name);

  constructor(
    private readonly repository: EpisodeReadModelRepository,
    private readonly mapper: EpisodeMapper,
  ) {}

  public async getById(id: EpisodeId): Promise<EpisodeDto | null> {
    try {
      const episode = await this.repository.getById(id);

      return this.mapper.toDto(episode);
    } catch (error) {
      this.logger.error(`Failed to get by id (id=${id}):`, error);

      throw error;
    }
  }

  public async getAll(query: GetAllQuery): Promise<PaginatedEpisodeDto> {
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
