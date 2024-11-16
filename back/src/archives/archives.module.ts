import { Module } from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { ArchivesController } from './archives.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelf, ShelfSchema } from '../shelf/shelf.schema';
import { Archives, ArchivesSchema } from './archives.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Archives.name, schema: ArchivesSchema },
    ]),
  ],
  controllers: [ArchivesController],
  providers: [ArchivesService],
})
export class ArchivesModule {}
