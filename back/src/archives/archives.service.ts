import { Injectable } from '@nestjs/common';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Archives } from './archives.schema';

@Injectable()
export class ArchivesService {
  constructor(@InjectModel('Archives') private archiveModel: Model<Archives>) {}

  async create(createArchiveDto: CreateArchiveDto): Promise<Archives> {
    const createdArchive = new this.archiveModel(createArchiveDto);
    return createdArchive.save();
  }

  async findAll(): Promise<Archives[]> {
    return this.archiveModel.find().exec();
  }

  async findOne(id: string): Promise<Archives> {
    return this.archiveModel.findById(id).exec();
  }

  async update(
    id: string,
    updateArchiveDto: UpdateArchiveDto,
  ): Promise<Archives> {
    return this.archiveModel
      .findByIdAndUpdate(id, updateArchiveDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Archives> {
    return this.archiveModel.findByIdAndDelete(id).exec();
  }
}
