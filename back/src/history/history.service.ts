import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History } from './history.schema';

@Injectable()
export class HistoryService {
  constructor(@InjectModel('History') private historyModel: Model<History>) {}

  async create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const createdHistory = new this.historyModel(createHistoryDto);
    return createdHistory.save();
  }

  async findAll(): Promise<History[]> {
    return this.historyModel.find().exec();
  }

  async findOne(id: string): Promise<History> {
    return this.historyModel.findById(id).exec();
  }

  async update(
    id: string,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    return this.historyModel
      .findByIdAndUpdate(id, updateHistoryDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<History> {
    return this.historyModel.findByIdAndDelete(id).exec();
  }
}
