import { PartialType } from '@nestjs/mapped-types';
import { CreateArchiveDto } from './create-archive.dto';
import { Archives } from '../archives.schema';

export class UpdateArchiveDto extends PartialType(CreateArchiveDto) {}
