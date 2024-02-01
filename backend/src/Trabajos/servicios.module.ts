import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trabajo } from './dto/trabajo.entity';
import { TrabajosService } from './servicios.service';
import { TrabajosController } from './servicios.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Trabajo])],
    controllers: [TrabajosController],
    providers: [TrabajosService],
    exports: [TrabajosService], 
})
export class TrabajosModule { }