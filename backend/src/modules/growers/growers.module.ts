import { Module } from '@nestjs/common';
import { GrowersService } from './services/growers.service';
import { GrowersController } from './controllers/growers.controller';

@Module({
  controllers: [GrowersController],
  providers: [GrowersService],
})
export class GrowersModule {}
