import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Book } from '../book/book.schema';

export type ShelfDocument = HydratedDocument<Shelf>;

@Schema()
export class Shelf {
  constructor(@InjectModel(Shelf.name) private userModule: Model<Shelf>) {}

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  age: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Book' })
  books: Array<Book>;

  @Prop()
  name: string;

  @Prop(Date)
  createdAt: Date;

  @Prop(Date)
  updatedAt: Date;

  @Prop()
  type: 'history' | 'wishlist' | 'default' = 'default';
}

export const ShelfSchema = SchemaFactory.createForClass(Shelf);
