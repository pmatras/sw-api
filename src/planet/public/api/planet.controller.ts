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
import { PlanetService } from '../../app/service/planet.service';
import { PlanetReadModel } from '../../app/service/planet-read-model.service';
import { PaginatedPlanetsDto, PlanetDto } from './contract/planet.dto';
import { PlanetId } from '../planet.id';
import { GetAllQueryDto } from './contract/get/get-all-query.dto';
import { CreatePlanetDto } from './contract/create/create-episode.dto';
import { UpdatePlanetDto } from './contract/update/update-planet.dto';

@ApiTags('Planet')
@Controller({
  path: '/planet',
  version: '1',
})
export class PlanetController {
  constructor(
    private readonly planetService: PlanetService,
    private readonly planetReadModel: PlanetReadModel,
  ) {}

  @ApiOperation({
    summary: 'Get by id',
    description: 'Get planet by its id',
  })
  @ApiResponse({
    type: PlanetDto,
    status: 200,
    description: 'Planet with given id',
  })
  @ApiResponse({
    type: NotFoundException,
    status: 404,
    description: 'Planet with given id has not been found',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Get()
  public async getById(
    @Query('planetId', new ParseUUIDPipe()) planetId: PlanetId,
  ): Promise<PlanetDto> {
    try {
      const planet = await this.planetReadModel.getById(planetId);

      if (!planet) {
        throw new NotFoundException('Planet with given id has not been found');
      }

      return planet;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get planet');
    }
  }

  @ApiOperation({ summary: 'Get all', description: 'Get all planets' })
  @ApiResponse({
    type: PaginatedPlanetsDto,
    status: 200,
    description: 'Found planets',
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
  ): Promise<PaginatedPlanetsDto> {
    try {
      const planets = await this.planetReadModel.getAll({
        pagination: { page: query.page, perPage: query.perPage },
      });

      return planets;
    } catch {
      throw new InternalServerErrorException('Failed to get planets');
    }
  }

  @ApiOperation({
    summary: 'Create new planet',
    description: 'Create new Star Wars planet',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Episode planet successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(201)
  @Post()
  public async create(@Body() payload: CreatePlanetDto): Promise<true> {
    try {
      const result = await this.planetService.create({ name: payload.name });

      if (!result) {
        throw new InternalServerErrorException('Failed to create planet');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create planet');
    }
  }

  @ApiOperation({
    summary: 'Update planet',
    description: 'Update Star Wars planet',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Planet updated successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Put()
  public async update(@Body() payload: UpdatePlanetDto): Promise<true> {
    try {
      const result = await this.planetService.update({
        id: payload.id,
        name: payload.name ?? undefined,
      });

      if (!result) {
        throw new InternalServerErrorException('Failed to update planet');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update planet');
    }
  }

  @ApiOperation({
    summary: 'Delete planet',
    description: 'Delete Star Wars planet',
  })
  @ApiResponse({
    type: Boolean,
    status: 200,
    description: 'Planet deleted successfully',
  })
  @ApiResponse({
    type: InternalServerErrorException,
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Delete()
  public async delete(
    @Query('planetId', new ParseUUIDPipe()) planetId: PlanetId,
  ): Promise<true> {
    try {
      const result = await this.planetService.delete({ id: planetId });

      if (!result) {
        throw new InternalServerErrorException('Failed to delete planet');
      }

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete planet');
    }
  }
}
