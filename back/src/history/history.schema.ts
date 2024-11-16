import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Like } from '../like/like.schema';
import { View } from '../view/view.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema()
export class History {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [String] })
  searches: Array<string>;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Views' })
  views: Array<View>;
}

export const HistorySchema = SchemaFactory.createForClass(History);
