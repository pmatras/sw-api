import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { EpisodeId } from '../../../../../episode/public/episode.id';
import { PlanetId } from '../../../../../planet/public/planet.id';

export class UpdateCharacterDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Id of character to update',
  })
  @IsUUID('4')
  id: string;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    description: 'New character name',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string | null;

  @ApiProperty({
    type: [String],
    required: false,
    nullable: true,
    description:
      "Episodes' ids in which character has appeared. Will override all character's episodes.",
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
