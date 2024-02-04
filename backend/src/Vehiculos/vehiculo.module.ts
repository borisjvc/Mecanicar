import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './dto/vehiculo.entity';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Vehiculo])],
    controllers: [VehiculoController],
    providers: [VehiculoService, JwtService],
    exports: [], 
})
export class VehiculoModule { }