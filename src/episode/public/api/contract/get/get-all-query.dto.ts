import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class GetAllQueryDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'Page data to fetch',
  })
  @IsNumber()
  @IsPositive()
  page: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    description: 'Size of data page to fetch',
  })
  @IsNumber()
  @IsPositive()
  perPage: number;
}
