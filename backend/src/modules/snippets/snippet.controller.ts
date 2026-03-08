import { Controller, Query, Get, Post, Body } from '@nestjs/common';
import { SnippetService } from './snippet.service.js';
import { PaginationDto } from '../dto/pagination.dto.js';
import { CreateSnippetDto } from '../dto/create.dto.js';

@Controller('snippets')
export class SnippetController {
  constructor(private snippetsService: SnippetService) {}

  @Post()
  async createNewSnippet(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.createNew(createSnippetDto);
  }

  @Get()
  async getAllSnippets(@Query() paginationDto: PaginationDto) {
    return this.snippetsService.findAll(paginationDto);
  }
}
