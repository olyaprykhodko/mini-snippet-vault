import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ArrayMaxSize,
} from 'class-validator';

export class UpdateSnippetDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  content?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsIn(['link', 'note', 'command'])
  type?: 'link' | 'note' | 'command';
}
