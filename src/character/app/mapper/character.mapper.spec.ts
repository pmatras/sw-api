import { v4 } from 'uuid';
import { CharacterEntity } from '../../domain/entity/character.entity';
import { CharacterMapper } from './character.mapper';
import { CharacterDto } from '../../public/character.dto';

describe(CharacterMapper.name, () => {
  const entity: CharacterEntity = {
    id: v4(),
    name: 'Luke Skywalker',
    episodes: [
      {
        id: v4(),
        name: 'New Hope',
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    ],
    planet: {
      id: v4(),
      name: 'Tatooine',
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  const sut = new CharacterMapper();

  describe('toDto', () => {
    it('should return null for null entity', () => {
      const dto = sut.toDto(null);

      expect(dto).toBeNull();
    });

    it('should return properly mapped instance of DTO class', () => {
      const dto = sut.toDto(entity);

      expect(dto).toBeInstanceOf(CharacterDto);
      expect(dto).toEqual({
        ...entity,
      });
    });
  });

  describe('toDtos', () => {
    it('should return empty array for no entities', () => {
      const dtos = sut.toDtos([]);

      expect(dtos).toEqual([]);
    });

    it('should return array of properly mapped instances of DTO class', () => {
      const dtos = sut.toDtos([entity]);

      expect(dtos.every((dto) => dto instanceof CharacterDto)).toBe(true);
      expect(dtos).toEqual([{ ...entity }]);
    });
  });
});
