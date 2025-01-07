import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Planet name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}
