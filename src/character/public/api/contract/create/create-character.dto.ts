import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PlanetId } from '../../../../../planet/public/planet.id';
import { EpisodeId } from '../../../../../episode/public/episode.id';

export class CreateCharacterDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Character name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    type: [String],
    required: false,
    nullable: true,
    description: "Episodes' ids in which character has appeared",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  episodesIds: EpisodeId[] | null;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    description: "Id of character's planet",
  })
  @IsOptional()
  @IsString()
  planetId: PlanetId | null;
}
