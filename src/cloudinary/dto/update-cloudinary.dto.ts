import { PartialType } from '@nestjs/mapped-types';
import { CreateCloudinaryDto } from './create-cloudinary.dto.js';

export class UpdateCloudinaryDto extends PartialType(CreateCloudinaryDto) {}
