// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service.js';
// import { CreateCloudinaryDto } from './dto/create-cloudinary.dto.js';
// import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto.js';

// @Controller('cloudinary')
// export class CloudinaryController {
//   constructor(private readonly cloudinaryService: CloudinaryService) {}

//   @Post()a
//   findOne(@Param('id') id: string) {
//     return this.cloudinaryService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCloudinaryDto: UpdateCloudinaryDto) {
//     return this.cloudinaryService.update(+id, updateCloudinaryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.cloudinaryService.remove(+id);
//   }
// }
