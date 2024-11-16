import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelf, ShelfSchema } from '../shelf/shelf.schema';
import { Comment, CommentSchema } from '../comment/comment.schema';
import { Book, BookSchema } from './book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
