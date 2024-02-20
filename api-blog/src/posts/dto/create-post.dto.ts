import { IsDefined, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsDefined()
  title: string;
  @IsString()
  @IsDefined()
  author: string;
  @IsString()
  @IsDefined()
  content: string;
}
