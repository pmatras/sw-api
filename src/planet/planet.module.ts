import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MikroORMPlanetEntity } from './infrastructure/database/mikro-orm-planet.entity';
import { PlanetController } from './public/api/planet.controller';
import { PlanetReadModelRepository } from './app/interface/planet-read-model.repository';
import { MikroORMPlanetReadModelRepository } from './infrastructure/database/mikro-orm-planet-read-model.repository';
import { PlanetWriteModelRepository } from './app/interface/planet-write-model.repository';
import { MikroORMPlanetWriteModelRepository } from './infrastructure/database/mikro-orm-planet-write-model.repository';
import { PlanetReadModel } from './app/service/planet-read-model.service';
import { PlanetService } from './app/service/planet.service';
import { PlanetMapper } from './app/mapper/planet.mapper';

@Module({
  imports: [MikroOrmModule.forFeature([MikroORMPlanetEntity])],
  providers: [
    {
      provide: PlanetReadModelRepository,
      useClass: MikroORMPlanetReadModelRepository,
    },
    {
      provide: PlanetWriteModelRepository,
      useClass: MikroORMPlanetWriteModelRepository,
    },
    PlanetMapper,
    PlanetReadModel,
    PlanetService,
  ],
  controllers: [PlanetController],
})
export class PlanetModule {}
