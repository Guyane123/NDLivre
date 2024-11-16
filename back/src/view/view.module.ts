import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelf, ShelfSchema } from '../shelf/shelf.schema';
import { View, ViewSchema } from './view.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: View.name, schema: ViewSchema }]),
    UserModule,
  ],
  controllers: [ViewController],
  providers: [ViewService],
})
export class ViewModule {}
