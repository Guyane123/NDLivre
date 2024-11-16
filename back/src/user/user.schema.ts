import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from '../book/book.schema';
import { Comment } from '../comment/comment.schema';
import { Archives } from '../archives/archives.schema';
import { Like } from '../like/like.schema';
import { History } from '../history/history.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' })
  comments: Array<Comment>;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Book' })
  books: Array<Book>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Archives' })
  archive: Archives;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Like' })
  likes: Array<Like>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'History' })
  history: History;

  @Prop()
  password: string;

  @Prop(String)
  name: string;

  @Prop(String)
  firstName: string;

  @Prop({ type: String, unique: true })
  pseudo: string;

  @Prop(String)
  image: string;

  @Prop(String)
  email: string;

  @Prop()
  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Types } from 'mongoose';
import { IsEmail } from 'class-validator';

// Function to create a mock user
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    comments: overrides.comments || [
      new Types.ObjectId() as unknown as Comment,
    ],
    books: overrides.books || [new Types.ObjectId() as unknown as Book],
    archive: overrides.archive || (new Types.ObjectId() as unknown as Archives),
    likes: overrides.likes || [new Types.ObjectId() as unknown as Like],
    history: overrides.history || (new Types.ObjectId() as unknown as History),
    password: overrides.password || 'password',
    name: overrides.name || 'John Doe',
    email: overrides.email || 'johndoe@gmail.com',
    firstName: overrides.firstName || 'John',
    pseudo: overrides.pseudo || 'johnd',
    image: overrides.image || 'https://thispersondoesnotexist.com',
    _id: overrides._id || '-1',
  };
}
