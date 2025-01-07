import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MikroORMCharacterEntity } from './infrastructure/database/mikro-orm-character.entity';
import { CharacterController } from './public/api/character.controller';
import { CharacterWriteModelRepository } from './app/interface/character-write-model.repository';
import { MikroORMCharacterWriteModelRepository } from './infrastructure/database/mikro-orm-character-write-model.repository';
import { CharacterReadModelRepository } from './app/interface/character-read-model.repository';
import { MikroORMCharacterReadModelRepository } from './infrastructure/database/mikro-orm-character-read-model.repository';
import { CharacterService } from './app/service/character.service';
import { CharacterReadModel } from './app/service/character-read-model.service';
import { CharacterMapper } from './app/mapper/character.mapper';
import { MikroORMCharacterMapper } from './infrastructure/database/mapper/mikro-orm-character.mapper';

@Module({
  imports: [MikroOrmModule.forFeature([MikroORMCharacterEntity])],
  providers: [
    MikroORMCharacterMapper,
    {
      provide: CharacterWriteModelRepository,
      useClass: MikroORMCharacterWriteModelRepository,
    },
    {
      provide: CharacterReadModelRepository,
      useClass: MikroORMCharacterReadModelRepository,
    },
    CharacterMapper,
    CharacterService,
    CharacterReadModel,
  ],
  controllers: [CharacterController],
})
export class CharacterModule {}
