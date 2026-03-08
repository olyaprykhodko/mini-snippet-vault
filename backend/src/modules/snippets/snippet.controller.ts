import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SnippetService } from './snippet.service.js';
import { SearchDto } from './dto/search.dto.js';
import { CreateSnippetDto } from './dto/create.dto.js';
import { UpdateSnippetDto } from './dto/update.dto.js';

@Controller('snippets')
export class SnippetController {
  constructor(private snippetsService: SnippetService) {}

  @Post()
  async createNewSnippet(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.createNew(createSnippetDto);
  }

  @Get()
  async getAllSnippets(@Query() paginationDto: SearchDto) {
    return this.snippetsService.findAll(paginationDto);
  }

  @Get(':id')
  async getSnippetById(@Param('id') id: string) {
    return this.snippetsService.findById(id);
  }

  @Patch(':id')
  async updateSnippetById(
    @Body() updateDto: UpdateSnippetDto,
    @Param('id') id: string,
  ) {
    return this.snippetsService.updateById(id, updateDto);
  }

  @Delete(':id')
  async deleteSnippetById(@Param('id') id: string) {
    return this.snippetsService.deleteById(id);
  }
}
