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
import { CreateCharacterDto } from './contract/create/create-character.dto';
import { CharacterDto, PaginatedCharactersDto } from './contract/character.dto';
import { CharacterService } from '../../app/service/character.service';
import { UpdateCharacterDto } from './contract/update/update-character.dto';
import { CharacterId } from '../character.id';
import { CharacterReadModel } from '../../app/service/character-read-model.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllQueryDto } from './contract/get/get-all-query.dto';
import { PaginatedCharacterDto } from '../character.dto';

@ApiTags('Character')
@Controller({
  path: '/character',
  version: '1',
})
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly characterReadModel: CharacterReadModel,
  ) {}

  @ApiOperation({
    summary: 'Get by id',
    description: 'Get character by its id',
  })
  @ApiResponse({
    type: CharacterDto,
    status: 200,
    description: 'Character with given id',
  })
  @ApiResponse({
    type: NotFoundException,
    status: 404,
    description: 'Character with given id has not been found',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Get()
  public async getById(
    @Query('characterId', new ParseUUIDPipe()) characterId: CharacterId,
  ): Promise<CharacterDto> {
    try {
      const character = await this.characterReadModel.getById(characterId);

      if (!character) {
        throw new NotFoundException(
          'Character with given id has not been found',
        );
      }

      return character;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get character');
    }
  }

  @ApiOperation({ summary: 'Get all', description: 'Get all characters' })
  @ApiResponse({
    type: PaginatedCharactersDto,
    status: 200,
    description: 'Found characters',
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
  ): Promise<PaginatedCharacterDto> {
    try {
      const characters = await this.characterReadModel.getAll({
        pagination: { page: query.page, perPage: query.perPage },
      });

      return characters;
    } catch {
      throw new InternalServerErrorException('Failed to get characters');
    }
  }

  @ApiOperation({
    summary: 'Create new character',
    description: 'Create new Star Wars character',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Character created successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(201)
  @Post()
  public async create(@Body() payload: CreateCharacterDto): Promise<true> {
    try {
      const result = await this.characterService.create({
        name: payload.name,
        episodesIds: payload.episodesIds?.length
          ? payload.episodesIds
          : undefined,
        planetId: payload.planetId ?? undefined,
      });

      if (!result) {
        throw new InternalServerErrorException('Failed to create character');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create character');
    }
  }

  @ApiOperation({
    summary: 'Update character',
    description: 'Update Star Wars character',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Character updated successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Put()
  public async update(@Body() payload: UpdateCharacterDto): Promise<true> {
    try {
      const result = await this.characterService.update({
        id: payload.id,
        name: payload.name ?? undefined,
        episodesIds: payload.episodesIds?.length
          ? payload.episodesIds
          : undefined,
        planetId: payload.planetId ?? undefined,
      });

      if (!result) {
        throw new InternalServerErrorException('Failed to update character');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update character');
    }
  }

  @ApiOperation({
    summary: 'Delete character',
    description: 'Delete Star Wars character',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Character deleted successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Delete()
  public async delete(
    @Query('characterId', new ParseUUIDPipe()) characterId: string,
  ): Promise<true> {
    try {
      const result = await this.characterService.delete({ id: characterId });

      if (!result) {
        throw new InternalServerErrorException('Failed to delete character');
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
