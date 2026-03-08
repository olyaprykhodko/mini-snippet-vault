import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SnippetDocument } from '../../../models/SnippetDocument.js';

const SEED_SNIPPETS: Array<
  Pick<SnippetDocument, 'title' | 'content' | 'tags' | 'type'>
> = [
  {
    title: 'Deploy check',
    content: 'npm run build',
    tags: ['nextjs', 'deploy', 'build'],
    type: 'command',
  },
  {
    title: 'Mongo dump',
    content: 'mongodump --uri "$MONGO_CONNECTION_URI" --out ./backup',
    tags: ['mongo', 'backup', 'database'],
    type: 'command',
  },
  {
    title: 'Interfaces',
    content: 'Remember to write props interfaces for components',
    tags: ['typescript', 'next', 'frontend'],
    type: 'note',
  },
  {
    title: 'Tailwind docs',
    content: 'https://tailwindcss.com/docs/installation/using-vite',
    tags: ['tailwind', 'css', 'reference'],
    type: 'link',
  },
  {
    title: 'Dependency injection',
    content:
      'DI allows the creation of dependent objects outside of a class and provides those objects to another class that depends on it through injection at runtime rather than the dependent class creating it',
    tags: ['nestjs', 'backend'],
    type: 'note',
  },
  {
    title: 'Kill port 3000',
    content: 'lsof -ti :3000 | xargs kill -9',
    tags: ['macos', 'ports', 'command'],
    type: 'command',
  },
  {
    title: 'Mongoose text search',
    content:
      'Text indexes are useful for title/content search, but keep exact tag filtering on a normal array field.',
    tags: ['mongoose', 'search', 'index'],
    type: 'note',
  },
  {
    title: 'NestJS docs',
    content: 'https://docs.nestjs.com/',
    tags: ['nestjs', 'reference', 'backend'],
    type: 'link',
  },
  {
    title: 'Curl create snippet',
    content:
      'curl -X POST http://localhost:3000/snippets -H \'Content-Type: application/json\' -d \'{"title":"CLI tip","content":"Use ripgrep for codebase search","tags":["cli","search"],"type":"note"}\'',
    tags: ['api', 'curl', 'testing'],
    type: 'command',
  },
  {
    title: 'Editor UX rule',
    content: 'Do not forget about loading, empty and error states.',
    tags: ['ux', 'frontend', 'states'],
    type: 'note',
  },
  {
    title: 'Ripgrep guide',
    content: 'https://github.com/BurntSushi/ripgrep',
    tags: ['cli', 'search', 'tools'],
    type: 'link',
  },
  {
    title: 'Docker rebuild',
    content: 'docker compose down -v && docker compose up --build',
    tags: ['docker', 'compose', 'command'],
    type: 'command',
  },
  {
    title: 'Commit naming',
    content:
      'feat - new functionality; fix - fix bugs; docs - changes in documentation; refactor - change structure without new functionality; style - formatting; chore - update dependencies; ci - project build configuration',
    tags: ['git', 'workflow', 'review'],
    type: 'note',
  },
  {
    title: 'Remix Icon set',
    content: 'https://remixicon.com/',
    tags: ['icons', 'ui', 'reference'],
    type: 'link',
  },
  {
    title: 'Check TypeScript errors',
    content: 'npm run build && npm run lint',
    tags: ['typescript', 'quality', 'command'],
    type: 'command',
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
