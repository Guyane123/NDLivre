import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Like } from '../like/like.schema';
import { View } from '../view/view.schema';
import { Comment } from '../comment/comment.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'comment' })
  comments: Array<Comment>;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Like' })
  likes: Array<Like>;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Views' })
  views: Array<View>;

  @Prop()
  title: string;

  @Prop()
  authors: Array<string>;

  @Prop()
  image: string;

  @Prop()
  gID: string;

  @Prop()
  isVisible: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
