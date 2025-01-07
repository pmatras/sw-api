import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetadata } from '../../../../shared/type/pagination.interface';
import { CharacterId } from '../../character.id';
import { EpisodeDto } from '../../../../episode/public/api/contract/episode.dto';
import { PlanetDto } from '../../../../planet/public/api/contract/planet.dto';

export class CharacterDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Id of the character',
  })
  id: CharacterId;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Name of the character',
  })
  name: string;

  @ApiProperty({ type: [EpisodeDto], description: 'Id of the character' })
  episodes: EpisodeDto[];

  @ApiProperty({
    type: PlanetDto,
    required: false,
    nullable: true,
    description: 'Planet of the character',
  })
  planet: PlanetDto | null;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Creation time',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Modification time',
  })
  modifiedAt: Date;
}

export class PaginatedCharactersDto {
  @ApiProperty({
    type: [CharacterDto],
    required: true,
    nullable: false,
    description: 'Characters',
  })
  records: CharacterDto[];

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Metadata',
  })
  metadata: PaginationMetadata;
}
