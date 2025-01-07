import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from '../../app/service/character.service';
import { CharacterReadModel } from '../../app/service/character-read-model.service';
import { Test } from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { MikroORMCharacterEntity } from '../../infrastructure/database/mikro-orm-character.entity';
import { MikroORMCharacterMapper } from '../../infrastructure/database/mapper/mikro-orm-character.mapper';
import { CharacterReadModelRepository } from '../../app/interface/character-read-model.repository';
import { MikroORMCharacterReadModelRepository } from '../../infrastructure/database/mikro-orm-character-read-model.repository';
import { CharacterWriteModelRepository } from '../../app/interface/character-write-model.repository';
import { MikroORMCharacterWriteModelRepository } from '../../infrastructure/database/mikro-orm-character-write-model.repository';
import * as supertest from 'supertest';
import { v4 } from 'uuid';
import { CharacterMapper } from '../../app/mapper/character.mapper';

// normally execution of such test should be run independently from the unit tests,
// both unit and integration/e2e tests are run alongside for simplicity of this assignment
jest.setTimeout(120_000);

describe(CharacterController.name, () => {
  const characterId = '1b9d6bcd-bf00-4e03-a195-7a0f58c87239';
  const characterName = 'Luke Skywalker';

  let app: INestApplication;
  let startedContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    // could be exported to some shared tests fixtures
    const container: PostgreSqlContainer = new PostgreSqlContainer(
      'postgres:16-alpine',
    );

    startedContainer = await container.start();

    const moduleFixture = await Test.createTestingModule({
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
        CharacterService,
        CharacterReadModel,
        CharacterMapper,
        MikroORMCharacterMapper,
        {
          provide: CharacterReadModelRepository,
          useClass: MikroORMCharacterReadModelRepository,
        },
        {
          provide: CharacterWriteModelRepository,
          useClass: MikroORMCharacterWriteModelRepository,
        },
      ],
      controllers: [CharacterController],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: false,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    app.enableVersioning({ type: VersioningType.URI });

    app.enableShutdownHooks();

    await app.init();

    await fixtures.initDatabase(app.get(MikroORM), {
      id: characterId,
      name: characterName,
    });
  });

  afterAll(async () => {
    await app.close();
    await startedContainer.stop();
  });

  describe('/character', () => {
    describe('GET /', () => {
      it('should return HTTP 400 for invalid query', async () => {
        const response = await supertest(app.getHttpServer()).get(
          '/v1/character',
        );

        expect(response.status).toEqual(400);
        expect(response.body).toMatchObject({
          message: expect.stringContaining('UUID'),
        });
      });

      it("should return HTTP 404 if character couldn't be found", async () => {
        const response = await supertest(app.getHttpServer())
          .get('/v1/character')
          .query({
            characterId: v4(),
          });

        expect(response.status).toEqual(404);
        expect(response.body).toMatchObject({
          message: 'Character with given id has not been found',
        });
      });

      it('should return HTTP 200 and character', async () => {
        const response = await supertest(app.getHttpServer())
          .get('/v1/character')
          .query({
            characterId,
          });

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
          id: characterId,
          name: characterName,
          episodes: [],
          planet: null,
          createdAt: expect.any(String),
          modifiedAt: expect.any(String),
        });
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
