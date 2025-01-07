import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { CharacterWriteModelRepository } from '../interface/character-write-model.repository';
import { createMock } from '@golevelup/ts-jest';

describe(CharacterService.name, () => {
  const name = 'Luke Skywalker';

  let app: TestingModule;
  let repository: CharacterWriteModelRepository;

  let sut: CharacterService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: CharacterWriteModelRepository,
          useValue: createMock<CharacterWriteModelRepository>(),
        },
      ],
    }).compile();

    repository = app.get(CharacterWriteModelRepository);
    sut = app.get(CharacterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should throw error upon repository error', async () => {
      jest
        .mocked(repository)
        .create.mockRejectedValueOnce(new Error('Test error'));

      await expect(() =>
        sut.create({
          name,
        }),
      ).rejects.toThrow('Test error');
    });

    it('should return result', async () => {
      jest.mocked(repository).create.mockResolvedValueOnce(false);

      const result = await sut.create({ name });

      expect(result).toEqual(false);
    });

    it('should return result', async () => {
      jest.mocked(repository).create.mockResolvedValueOnce(true);

      const result = await sut.create({ name });

      expect(result).toEqual(true);
    });
  });
});
