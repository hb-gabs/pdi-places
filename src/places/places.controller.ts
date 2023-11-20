import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get('/company/:companyId')
  findAll(@Param('companyId') companyId: string) {
    return this.placesService.findAll(companyId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.placesService.findById(id);
  }
}
