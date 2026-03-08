import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SnippetDocument } from '../../../models/SnippetDocument.js';
import { Model } from 'mongoose';
import { PaginationDto } from '../../modules/snippets/dto/pagination.dto.js';
import { CreateSnippetDto } from '../../modules/snippets/dto/create.dto.js';
import { ApiErrorException } from '../../response-builder/api-error.exception.js';
import { buildSuccessResponse } from '../../response-builder/response.js';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel('Snippet')
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async createNew(snippet: CreateSnippetDto) {
    const existing = await this.snippetModel.findOne({ title: snippet.title });

    if (existing) {
      throw new ApiErrorException(
        'Snippet with this title already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newSnippet = await this.snippetModel.create({
      title: snippet.title,
      content: snippet.content,
      tags: snippet.tags,
      type: snippet.type,
    });

    return buildSuccessResponse(
      HttpStatus.CREATED,
      'Snippet successfully created',
      newSnippet,
    );
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit, q, tag } = pagination;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    const normalizedQuery = q?.trim();
    const normalizedTag = tag?.trim();

    if (normalizedQuery) {
      const safeQuery = this.escapeRegExp(normalizedQuery);
      const queryRegex = new RegExp(safeQuery, 'i');

      filter.$or = [{ title: queryRegex }, { content: queryRegex }];
    }

    if (normalizedTag) {
      filter.tags = normalizedTag;
    }

    const data = await this.snippetModel.find(filter).skip(skip).limit(limit);

    return buildSuccessResponse(
      HttpStatus.OK,
      'Snippets successfully fetched',
      data,
    );
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
