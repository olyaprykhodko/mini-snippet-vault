import {
  IsArray,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  content: string;

  @IsArray()
  tags: string[] | [];

  @IsEnum(['link', 'note', 'command'])
  type: 'link' | 'note' | 'command';
}
