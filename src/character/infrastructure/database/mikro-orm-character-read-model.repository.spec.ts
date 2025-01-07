import { MikroORMCharacterReadModelRepository } from './mikro-orm-character-read-model.repository';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORMCharacterEntity } from './mikro-orm-character.entity';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { MikroORMCharacterMapper } from './mapper/mikro-orm-character.mapper';
import { v4 } from 'uuid';
import { CharacterReadModelRepository } from '../../app/interface/character-read-model.repository';

// normally execution of such test should be run independently from the unit tests,
// both unit and integration/e2e tests are run alongside for simplicity of the whole project
jest.setTimeout(120_000);

describe(MikroORMCharacterReadModelRepository.name, () => {
  const characterId = '1b9d6bcd-bf00-4e03-a195-7a0f58c87239';
  const characterName = 'Luke Skywalker';

  let startedContainer: StartedPostgreSqlContainer;

  let app: TestingModule;

  let sut: CharacterReadModelRepository;

  beforeAll(async () => {
    // could be exported to some shared tests fixtures
    const container: PostgreSqlContainer = new PostgreSqlContainer(
      'postgres:16-alpine',
    );

    startedContainer = await container.start();

    app = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          autoLoadEntities: true,
          allowGlobalContext: true,
          driver: PostgreSqlDriver,
          clientUrl: startedContainer.getConnectionUri(),
          extensions: [Migrator],
        }),
        MikroOrmModule.forFeature([MikroORMCharacterEntity]),
      ],
      providers: [
        {
          provide: CharacterReadModelRepository,
          useClass: MikroORMCharacterReadModelRepository,
        },
        MikroORMCharacterMapper,
      ],
    }).compile();

    sut = app.get(CharacterReadModelRepository);

    app.enableShutdownHooks();

    await fixtures.initDatabase(app.get(MikroORM), {
      id: characterId,
      name: characterName,
    });
  });

  afterAll(async () => {
    await app.close();
    await startedContainer.stop();
  });

  describe('getById', () => {
    it('should return null if character has not been found', async () => {
      const result = await sut.getById(v4());

      expect(result).toBeNull();
    });

    it('should return character', async () => {
      const result = await sut.getById(characterId);

      expect(result).toMatchObject({
        id: characterId,
        name: characterName,
        episodes: [],
        planet: null,
        createdAt: expect.any(Date),
        modifiedAt: expect.any(Date),
      });
    });
  });
});

const fixtures = {
  initDatabase: async (
    orm: MikroORM,
    characterData: { id: string; name: string },
  ) => {
    await orm.getMigrator().up();

    const character = orm.em.create(MikroORMCharacterEntity, {
      id: characterData.id,
      name: characterData.name,
    });

    await orm.em.persistAndFlush(character);
  },
};
