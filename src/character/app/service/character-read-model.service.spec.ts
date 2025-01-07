import { Test, TestingModule } from '@nestjs/testing';
import { CharacterReadModel } from './character-read-model.service';
import { CharacterMapper } from '../mapper/character.mapper';
import { CharacterReadModelRepository } from '../interface/character-read-model.repository';
import { createMock } from '@golevelup/ts-jest';

describe(CharacterReadModel.name, () => {
  const characterId = '1b9d6bcd-bf00-4e03-a195-7a0f58c87239';
  let app: TestingModule;
  let repository: CharacterReadModelRepository;

  let sut: CharacterReadModel;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        CharacterReadModel,
        CharacterMapper,
        {
          provide: CharacterReadModelRepository,
          useValue: createMock<CharacterReadModelRepository>(),
        },
      ],
    }).compile();

    repository = app.get(CharacterReadModelRepository);
    sut = app.get(CharacterReadModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getById', () => {
    it('should throw error upon repository error', async () => {
      jest
        .mocked(repository)
        .getById.mockRejectedValueOnce(new Error('Test error'));

      await expect(() => sut.getById(characterId)).rejects.toThrow(
        'Test error',
      );
    });

    it('should return null if no character has been found', async () => {
      jest.mocked(repository).getById.mockResolvedValueOnce(null);

      const result = await sut.getById(characterId);

      expect(result).toBeNull();
    });

    it('should return found character', async () => {
      jest
        .mocked(repository)
        .getById.mockImplementationOnce((characterId: string) =>
          Promise.resolve({
            id: characterId,
            name: 'Luke Skywalker',
            episodes: [],
            planet: null,
            createdAt: new Date(),
            modifiedAt: new Date(),
          }),
        );

      const result = await sut.getById(characterId);

      expect(result).toEqual({
        id: characterId,
        name: 'Luke Skywalker',
        episodes: [],
        planet: null,
        createdAt: expect.any(Date),
        modifiedAt: expect.any(Date),
      });
    });
  });
});
