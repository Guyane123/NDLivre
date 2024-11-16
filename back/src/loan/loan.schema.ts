import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Book } from '../book/book.schema';

export type LoanDocument = HydratedDocument<Loan>;

@Schema()
export class Loan {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  target: User;

  @Prop()
  validation: 'pending' | 'accepted' | 'denied';

  @Prop(Date)
  createdAt: Date;

  @Prop(Date)
  updatedAt: Date;

  @Prop(String)
  content: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
