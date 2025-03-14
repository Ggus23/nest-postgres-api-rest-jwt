import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { BreedModule } from 'src/breed/breed.module';
import { BreedService } from '../breed/breed.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), BreedModule, AuthModule],
  controllers: [CatsController],
  providers: [CatsService, BreedService],
})
export class CatsModule {}
