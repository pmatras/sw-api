import { ApiProperty } from '@nestjs/swagger';
import { EpisodeId } from '../../episode.id';
import { PaginationMetadata } from '../../../../shared/type/pagination.interface';

export class EpisodeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Id of the episode',
  })
  id: EpisodeId;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Name of the episode',
  })
  name: string;
}

export class PaginatedEpisodesDto {
  @ApiProperty({
    type: [EpisodeDto],
    required: true,
    nullable: false,
    description: 'Episodes',
  })
  records: EpisodeDto[];

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Metadata',
  })
  metadata: PaginationMetadata;
}
