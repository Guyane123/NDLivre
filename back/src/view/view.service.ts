import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { View } from './view.schema';

@Injectable()
export class ViewService {
  constructor(@InjectModel('View') private viewModel: Model<View>) {}

  async create(createViewDto: CreateViewDto): Promise<View> {
    const createdView = new this.viewModel(createViewDto);
    return createdView.save();
  }

  async findAll(): Promise<View[]> {
    return this.viewModel.find().exec();
  }

  async findOne(id: string): Promise<View> {
    return this.viewModel.findById(id).exec();
  }

  async update(id: string, updateViewDto: UpdateViewDto): Promise<View> {
    return this.viewModel
      .findByIdAndUpdate(id, updateViewDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<View> {
    return this.viewModel.findByIdAndDelete(id).exec();
  }
}
