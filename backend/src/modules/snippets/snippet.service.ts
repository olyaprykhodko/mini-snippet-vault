import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SnippetDocument } from '../../../models/SnippetDocument.js';
import { Model } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto.js';
import { CreateSnippetDto } from '../dto/create.dto.js';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel('Snippet')
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async createNew(data: CreateSnippetDto) {
    const existing = await this.snippetModel.findOne({ title: data.title });
    if (existing) {
      throw new ConflictException('Snippet with this title already exists');
    }

    const newSnippet = await this.snippetModel.create({
      title: data.title,
      content: data.content,
      tags: data.tags,
      type: data.type,
    });

    return { newSnippet };
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const data = await this.snippetModel.find().skip(skip).limit(limit);

    return { data };
  }
}
