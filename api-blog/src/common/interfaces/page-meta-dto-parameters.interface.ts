import { PageOptionsDto } from '../dtos/page-options.dtos';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total_elements: number;
  page_size: number;
}
