import { Injectable, Logger } from '@nestjs/common';
import { PlanetId } from '../../public/planet.id';
import { PlanetWriteModelRepository } from '../interface/planet-write-model.repository';

export interface CreateCommand {
  name: string;
}

export interface UpdateCommand {
  id: PlanetId;
  name?: string;
}

export interface DeleteCommand {
  id: PlanetId;
}

@Injectable()
export class PlanetService {
  private readonly logger = new Logger(PlanetService.name);

  constructor(private readonly repository: PlanetWriteModelRepository) {}

  public async create(command: CreateCommand): Promise<boolean> {
    try {
      return await this.repository.create(command);
    } catch (error) {
      this.logger.error(`Failed to create planet:`, error);

      throw error;
    }
  }

  public async update(command: UpdateCommand): Promise<boolean> {
    // could check if any property apart from 'id' is defined to not involve database request if not needed
    try {
      return await this.repository.update(command);
    } catch (error) {
      this.logger.error(`Failed to update planet:`, error);

      throw error;
    }
  }

  public async delete(command: DeleteCommand): Promise<boolean> {
    try {
      return await this.repository.delete(command);
    } catch (error) {
      this.logger.error(`Failed to delete planet:`, error);

      throw error;
    }
  }
}
