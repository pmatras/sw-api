import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateEpisodeDto {
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
}
