import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { GrowersService } from '../services/growers.service';
import { Grower } from '../entities/grower.entity';

@Controller()
export class GrowersController {
  constructor(private readonly growersService: GrowersService) {}

  @Get('/growers')
  async findAll() {
    const data = await this.growersService.findAll();
    return { message: 'success', data };
  }

  @Post('/grower')
  async create(@Body() grower: Grower) {
    const data = await this.growersService.create(grower);
    return { message: 'success', data };
  }

  @Put('/grower/:id')
  async update(@Param('id') id: string, @Body() grower: Grower) {
    await this.growersService.update(id, grower);
    return { message: 'success', data: { id, ...grower } };
  }

  @Delete('/grower/:id')
  async delete(@Param('id') id: string) {
    await this.growersService.delete(id);
    return { message: 'success', data: { id } };
  }
}
