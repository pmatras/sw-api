import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EpisodeService } from '../../app/service/episode.service';
import { EpisodeReadModel } from '../../app/service/episode-read-model.service';
import { EpisodeDto, PaginatedEpisodesDto } from './contract/episode.dto';
import { EpisodeId } from '../episode.id';
import { GetAllQueryDto } from './contract/get/get-all-query.dto';
import { CreateEpisodeDto } from './contract/create/create-episode.dto';
import { UpdateEpisodeDto } from './contract/update/update-episode.dto';

@ApiTags('Episode')
@Controller({
  path: '/episode',
  version: '1',
})
export class EpisodeController {
  constructor(
    private readonly episodeService: EpisodeService,
    private readonly episodeReadModel: EpisodeReadModel,
  ) {}

  @ApiOperation({
    summary: 'Get by id',
    description: 'Get episode by its id',
  })
  @ApiResponse({
    type: EpisodeDto,
    status: 200,
    description: 'Episode with given id',
  })
  @ApiResponse({
    type: NotFoundException,
    status: 404,
    description: 'Episode with given id has not been found',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Get()
  public async getById(
    @Query('episodeId', new ParseUUIDPipe()) episodeId: EpisodeId,
  ): Promise<EpisodeDto> {
    try {
      const episode = await this.episodeReadModel.getById(episodeId);

      if (!episode) {
        throw new NotFoundException('Episode with given id has not been found');
      }

      return episode;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get episode');
    }
  }

  @ApiOperation({ summary: 'Get all', description: 'Get all episodes' })
  @ApiResponse({
    type: PaginatedEpisodesDto,
    status: 200,
    description: 'Found episodes',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Get('/all')
  public async getAll(
    @Query() query: GetAllQueryDto,
  ): Promise<PaginatedEpisodesDto> {
    try {
      const episodes = await this.episodeReadModel.getAll({
        pagination: { page: query.page, perPage: query.perPage },
      });

      return episodes;
    } catch {
      throw new InternalServerErrorException('Failed to get episodes');
    }
  }

  @ApiOperation({
    summary: 'Create new episode',
    description: 'Create new Star Wars episode',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Episode created successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(201)
  @Post()
  public async create(@Body() payload: CreateEpisodeDto): Promise<true> {
    try {
      const result = await this.episodeService.create({ name: payload.name });

      if (!result) {
        throw new InternalServerErrorException('Failed to create episode');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create episode');
    }
  }

  @ApiOperation({
    summary: 'Update episode',
    description: 'Update Star Wars episode',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Episode updated successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Put()
  public async update(@Body() payload: UpdateEpisodeDto): Promise<true> {
    try {
      const result = await this.episodeService.update({
        id: payload.id,
        name: payload.name ?? undefined,
      });

      if (!result) {
        throw new InternalServerErrorException('Failed to update episode');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update episode');
    }
  }

  @ApiOperation({
    summary: 'Delete episode',
    description: 'Delete Star Wars episode',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Episode deleted successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Delete()
  public async delete(
    @Query('episodeId', new ParseUUIDPipe()) episodeId: string,
  ): Promise<true> {
    try {
      const result = await this.episodeService.delete({ id: episodeId });

      if (!result) {
        throw new InternalServerErrorException('Failed to create episode');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete character');
    }
  }
}
