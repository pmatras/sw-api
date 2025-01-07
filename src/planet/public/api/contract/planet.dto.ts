import { ApiProperty } from '@nestjs/swagger';
import { PlanetId } from '../../planet.id';
import { PaginationMetadata } from '../../../../shared/type/pagination.interface';

export class PlanetDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Id of the planet',
  })
  id: PlanetId;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Name of the planet',
  })
  name: string;
}

export class PaginatedPlanetsDto {
  @ApiProperty({
    type: [PlanetDto],
    required: true,
    nullable: false,
    description: 'Planets',
  })
  records: PlanetDto[];

  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Metadata',
  })
  metadata: PaginationMetadata;
}
