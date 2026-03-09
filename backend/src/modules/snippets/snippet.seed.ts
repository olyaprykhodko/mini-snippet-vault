import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SnippetDocument } from '../../../models/SnippetDocument.js';

const SEED_SNIPPETS: Array<
  Pick<SnippetDocument, 'title' | 'content' | 'tags' | 'type'>
> = [
  {
    title: 'Promises',
    content: 'Три стани промісу: pending, fulfilled, rejected',
    tags: ['js', 'node'],
    type: 'note',
  },
  {
    title: 'Docker compose detached mode',
    content: 'docker compose up --build -d',
    tags: ['docker'],
    type: 'command',
  },
  {
    title: 'Remix Icon set',
    content: 'https://remixicon.com/',
    tags: ['icons', 'ui'],
    type: 'link',
  },
];

@Injectable()
export class SnippetSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SnippetSeedService.name);

  constructor(
    @InjectModel('Snippet')
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async onApplicationBootstrap() {
    const total = await this.snippetModel.countDocuments();

    if (total > 0) {
      return;
    }

    await this.snippetModel.insertMany(SEED_SNIPPETS);
    this.logger.log(`Seeded ${SEED_SNIPPETS.length} snippets`);
  }
}
