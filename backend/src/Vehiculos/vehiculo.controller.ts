import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './dto/vehiculo.entity';

@Controller('vehiculos')
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) { }

    @Get(':idVehiculo')
    obtenerVehiculoPorID(@Param('idVehiculo', ParseIntPipe) idVehiculo: number) {
        return this.vehiculoService.obtenerVehiculoPorID(idVehiculo);
    }

    @Get()
    obtenerVehiculos() {
        return this.vehiculoService.obtenerVehiculos();
    }

    @Put(':idVehiculo')
    actualizarVehiculo(@Param('idVehiculo', ParseIntPipe) idVehiculo: number, @Body() body: any) {
        const { propNombre, marca, modelo, placas } = body;
        return this.vehiculoService.actualizarVehiculo(idVehiculo, propNombre, marca, modelo, placas);
    }

    @Delete(':idVehiculo')
    eliminarVehiculo(@Param('idVehiculo', ParseIntPipe) idVehiculo: number) {
        return this.vehiculoService.eliminarVehiculo(idVehiculo);
    }

}
