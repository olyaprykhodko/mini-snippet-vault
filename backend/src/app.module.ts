import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetModule } from './modules/snippets/snippet.module.js';

const mongoUri =
  process.env.MONGO_CONNECTION_URI ??
  'mongodb://root:example@localhost:27017/snippet_vault?authSource=admin&directConnection=true';

@Module({
  imports: [MongooseModule.forRoot(mongoUri), SnippetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
