import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  page_number: number;
  @ApiProperty()
  page_size: number;
  @ApiProperty()
  total_elements: number;
  @ApiProperty()
  total_pages: number;
}
export class PaginatedDto<TData> {
  @ApiProperty()
  _meta: Meta;
  @ApiProperty()
  data: TData[];
}
