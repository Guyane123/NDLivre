import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Book } from '../book/book.schema';

export type ViewDocument = HydratedDocument<View>;

@Schema()
export class View {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop()
  date: number;
}

export const ViewSchema = SchemaFactory.createForClass(View);
