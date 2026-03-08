import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SnippetDocument } from '../../../models/SnippetDocument.js';
import { Model, Types } from 'mongoose';
import { SearchDto } from './dto/search.dto.js';
import { CreateSnippetDto } from '../../modules/snippets/dto/create.dto.js';
import { UpdateSnippetDto } from './dto/update.dto.js';
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

  async findAll(query: SearchDto) {
    const { page, limit, q, tag } = query;
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

  async updateById(id: string, snippet: UpdateSnippetDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new ApiErrorException('Snippet not found', HttpStatus.NOT_FOUND);
    }

    const updatePayload: Record<string, unknown> = {};

    if (snippet.title !== undefined) {
      updatePayload.title = snippet.title;
    }

    if (snippet.content !== undefined) {
      updatePayload.content = snippet.content;
    }

    if (snippet.tags !== undefined) {
      updatePayload.tags = snippet.tags;
    }

    if (snippet.type !== undefined) {
      updatePayload.type = snippet.type;
    }

    if (Object.keys(updatePayload).length === 0) {
      throw new ApiErrorException(
        'Provide at least one field to update',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedSnippet = await this.snippetModel.findByIdAndUpdate(
      id,
      updatePayload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedSnippet) {
      throw new ApiErrorException('Snippet not found', HttpStatus.NOT_FOUND);
    }

    return buildSuccessResponse(
      HttpStatus.OK,
      'Snippet successfully updated',
      updatedSnippet,
    );
  }
}
