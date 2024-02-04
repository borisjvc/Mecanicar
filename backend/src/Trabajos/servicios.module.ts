import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from './dto/trabajo.entity';
import { TrabajosService } from './servicios.service';
import { TrabajosController } from './servicios.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Trabajo])],
    controllers: [TrabajosController],
    providers: [TrabajosService, JwtService],
    exports: [], 
})
export class TrabajosModule { }