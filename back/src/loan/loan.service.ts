import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan } from './loan.schema';

@Injectable()
export class LoanService {
  constructor(@InjectModel('Loan') private loanModel: Model<Loan>) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const createdLoan = new this.loanModel(createLoanDto);
    return createdLoan.save();
  }

  async findAll(): Promise<Loan[]> {
    return this.loanModel.find().exec();
  }

  async findOne(id: string): Promise<Loan> {
    return this.loanModel.findById(id).exec();
  }

  async update(id: string, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    return this.loanModel
      .findByIdAndUpdate(id, updateLoanDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Loan> {
    return this.loanModel.findByIdAndDelete(id).exec();
  }
}
