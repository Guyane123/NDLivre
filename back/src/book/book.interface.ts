import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Comment } from '../comment/comment.schema';
import { Like } from '../like/like.schema';
import { View } from '../view/view.schema';

export interface IBook extends Document {
  readonly user: User;
  readonly comments: Array<Comment>;
  readonly likes: Array<Like>;
  readonly views: Array<View>;
  readonly title: string;
  readonly authors: Array<string>;
  readonly image: string;
  readonly gID: string;
  readonly isVisible: boolean;
}
