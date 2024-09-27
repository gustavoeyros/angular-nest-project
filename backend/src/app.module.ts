import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './modules/firestore/firestore.module';
import { GrowersController } from './modules/growers/controllers/growers.controller';
import { GrowersService } from './modules/growers/services/growers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('FIRESTORE_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GrowersController],
  providers: [GrowersService],
})
export class AppModule {}
