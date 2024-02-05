import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Materiales } from './dto/materiales.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Materiales])],
    controllers: [MaterialesController],
    providers: [MaterialesService, JwtService],
    exports: [], 
})
export class MaterialesModule { }