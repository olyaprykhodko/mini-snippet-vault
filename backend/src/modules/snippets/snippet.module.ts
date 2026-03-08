import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { snippetSchema } from '../../../models/Snippet.js';
import { SnippetController } from './snippet.controller.js';
import { SnippetService } from './snippet.service.js';
import { SnippetSeedService } from './snippet.seed.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Snippet', schema: snippetSchema }]),
  ],
  controllers: [SnippetController],
  providers: [SnippetService, SnippetSeedService],
  exports: [],
})
export class SnippetModule {}
