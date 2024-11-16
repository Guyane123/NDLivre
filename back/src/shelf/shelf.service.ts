import { Injectable } from '@nestjs/common';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { UpdateShelfDto } from './dto/update-shelf.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shelf } from './shelf.schema';

@Injectable()
export class ShelfService {
  constructor(@InjectModel('Shelf') private shelfModel: Model<Shelf>) {}

  async create(createShelfDto: CreateShelfDto): Promise<Shelf> {
    const createdShelf = new this.shelfModel(createShelfDto);
    return createdShelf.save();
  }

  async findAll(): Promise<Shelf[]> {
    return this.shelfModel.find().exec();
  }

  async findOne(id: string): Promise<Shelf> {
    return this.shelfModel.findById(id).exec();
  }

  async update(id: string, updateShelfDto: UpdateShelfDto): Promise<Shelf> {
    return this.shelfModel
      .findByIdAndUpdate(id, updateShelfDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Shelf> {
    return this.shelfModel.findByIdAndDelete(id).exec();
  }
}
