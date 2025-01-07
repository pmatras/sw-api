import { PaginationMetadata } from '../../shared/type/pagination.interface';

export class PlanetDto {
  id: string;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}

export class PaginatedPlanetDto {
  records: PlanetDto[];
  metadata: PaginationMetadata;
}
