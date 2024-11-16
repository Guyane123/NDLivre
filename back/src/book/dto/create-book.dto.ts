import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Like } from '../../like/like.schema';
import { User } from '../../user/user.schema';
import { View } from '../../view/view.schema';

export class CreateBookDto {
  @IsNotEmpty()
  readonly user: User;

  @IsArray()
  @IsNotEmpty({ each: true })
  readonly comments: Array<Comment>;

  @IsArray()
  @IsNotEmpty({ each: true })
  readonly likes: Array<Like>;

  @IsArray()
  @IsNotEmpty({ each: true })
  readonly views: Array<View>;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly authors: Array<string>;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly gID: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isVisible: boolean;
}
