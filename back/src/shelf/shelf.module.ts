import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelf, ShelfSchema } from './shelf.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shelf.name, schema: ShelfSchema }]),
  ],
  controllers: [ShelfController],
  providers: [ShelfService],
})
export class ShelfModule {}
