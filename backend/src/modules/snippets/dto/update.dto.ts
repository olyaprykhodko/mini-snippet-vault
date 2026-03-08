import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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
  tags?: string[];

  @IsOptional()
  @IsEnum(['link', 'note', 'command'])
  type?: 'link' | 'note' | 'command';
}
