import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEpisodeDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    description: 'Episode name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}
