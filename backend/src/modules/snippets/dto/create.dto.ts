import {
  IsArray,
  IsIn,
  IsString,
  MaxLength,
  MinLength,
  ArrayMaxSize,
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
  @ArrayMaxSize(12)
  @IsString({ each: true })
  tags?: string[] | [];

  @IsIn(['link', 'note', 'command'])
  type: 'link' | 'note' | 'command';
}
