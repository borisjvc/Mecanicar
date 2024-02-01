import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './dto/vehiculo.entity';
import { actualizarVehiculo } from './dto/update-vehiculo.dto';

@Controller('vehiculos')
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) { }

    @Get()
    getVehiculos(): Promise<Vehiculo[]>{
        return this.vehiculoService.getVehiculos();
    }

    @Get(':id')
    getVehiculo(@Param('id', ParseIntPipe) idVehiculo: number){
        return this.vehiculoService.getVehiculo(idVehiculo);
    }

    @Post()
    crearVehiculo(@Body('nombre') nombre: string,@Body('marca') marca: string, @Body('modelo') modelo: string,@Body('placas') placas: string){
        return this.vehiculoService.crearVehiculo(nombre, marca, modelo, placas);
    }

    @Delete(':id')
    deleteVehiculo(@Param(':id', ParseIntPipe) idVehiculo: number){
        return this.vehiculoService.deleteVehiculo(idVehiculo);
    }

    @Patch(':id')
    updateVehiculo(@Param('id', ParseIntPipe) idVehiculo: number, @Body() tipo: actualizarVehiculo){
        return this.vehiculoService.updateVehiculo(idVehiculo, tipo);
    }

}
