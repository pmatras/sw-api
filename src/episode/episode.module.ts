import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MikroORMEpisodeEntity } from './infrastructure/database/mikro-orm-episode.entity';
import { EpisodeReadModelRepository } from './app/interface/episode-read-model.repository';
import { MikroORMEpisodeReadModelRepository } from './infrastructure/database/mikro-orm-episode-read-model.repository';
import { EpisodeWriteModelRepository } from './app/interface/episode-write-model.repository';
import { MikroORMEpisodeWriteModelRepository } from './infrastructure/database/mikro-orm-episode-write-model.repository';
import { EpisodeReadModel } from './app/service/episode-read-model.service';
import { EpisodeService } from './app/service/episode.service';
import { EpisodeMapper } from './app/mapper/episode.mapper';
import { EpisodeController } from './public/api/episode.controller';

@Module({
  imports: [MikroOrmModule.forFeature([MikroORMEpisodeEntity])],
  providers: [
    {
      provide: EpisodeReadModelRepository,
      useClass: MikroORMEpisodeReadModelRepository,
    },
    {
      provide: EpisodeWriteModelRepository,
      useClass: MikroORMEpisodeWriteModelRepository,
    },
    EpisodeMapper,
    EpisodeReadModel,
    EpisodeService,
  ],
  controllers: [EpisodeController],
})
export class EpisodeModule {}
