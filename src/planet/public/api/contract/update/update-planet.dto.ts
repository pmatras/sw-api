import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { PlanetId } from '../../../planet.id';

export class UpdatePlanetDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Id of planet to update',
  })
  @IsUUID('4')
  id: PlanetId;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    description: 'New planet name',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string | null;
}
