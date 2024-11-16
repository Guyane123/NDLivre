import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelfController } from './shelf/shelf.controller';
import { LikeController } from './like/like.controller';
import { LoanController } from './loan/loan.controller';
import { ViewModule } from './view/view.module';
import { AuthModule } from './auth/auth.module';
import { ShelfModule } from './shelf/shelf.module';
import { LikeModule } from './like/like.module';
import { HistoryController } from './history/history.controller';
import { LoanModule } from './loan/loan.module';
import { UserModule } from './user/user.module';
import { ArchivesModule } from './archives/archives.module';
import { BookModule } from './book/book.module';
import { CommentModule } from './comment/comment.module';
import { HistoryModule } from './history/history.module';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { LikeService } from './like/like.service';
import { ShelfService } from './shelf/shelf.service';
import { LoanService } from './loan/loan.service';
import { ViewService } from './view/view.service';
import { Archives, ArchivesSchema } from './archives/archives.schema';
import { ArchivesService } from './archives/archives.service';
import { AuthService } from './auth/auth.service';
import { CommentService } from './comment/comment.service';
import { BookService } from './book/book.service';
import { HistoryService } from './history/history.service';
import { ViewController } from './view/view.controller';
import { ArchivesController } from './archives/archives.controller';
import { User, UserSchema } from './user/user.schema';
import { Book, BookSchema } from './book/book.schema';
import { Loan, LoanSchema } from './loan/loan.schema';
import { Shelf, ShelfSchema } from './shelf/shelf.schema';
import { Like, LikeSchema } from './like/like.schema';
import { Comment, CommentSchema } from './comment/comment.schema';
import { History, HistorySchema } from './history/history.schema';
import { View, ViewSchema } from './view/view.schema';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/NDLivre'),
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LoanModule,
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    HistoryModule,
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    ViewModule,
    //MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ArchivesModule,
    BookModule,
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    CommentModule,
    LikeModule,
    ShelfModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Archives.name, schema: ArchivesSchema },
    ]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Shelf.name, schema: ShelfSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: View.name, schema: ViewSchema }]),
    ConfigModule.forRoot(),
  ],
  controllers: [
    AppController,
    LikeController,
    LoanController,
    ShelfController,
    HistoryController,
    LoanController,
    ViewController,
    ArchivesController,
  ],
  providers: [
    AppService,
    UserService,
    LikeService,
    ShelfService,
    LoanService,
    ViewService,
    ArchivesService,
    AuthService,
    CommentService,
    BookService,
    HistoryService,
    GoogleStrategy,
  ],
})
export class AppModule {}
