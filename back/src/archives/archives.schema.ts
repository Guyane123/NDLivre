import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Loan } from '../loan/loan.schema';

export type ArchivesDocument = HydratedDocument<Archives>;

@Schema()
export class Archives {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Loan' })
  loans: Array<Loan>;
}

export const ArchivesSchema = SchemaFactory.createForClass(Archives);
