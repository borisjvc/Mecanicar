import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';


@Controller('vehiculos')
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) { }

    @Get(':idVehiculo')
    @UseGuards(JwtAuthGuard)
    obtenerVehiculoPorID(@Param('idVehiculo', ParseIntPipe) idVehiculo: number) {
        return this.vehiculoService.obtenerVehiculoPorID(idVehiculo);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    obtenerVehiculos() {
        return this.vehiculoService.obtenerVehiculos();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async crearVehiculo(@Body('propietario') propietario: string, @Body('marca') marca: string, @Body('modelo') modelo: string, @Body('placas') placas: string){
        const id = await this.vehiculoService.crearVehiculo(propietario, marca, modelo, placas)
        return id[0][0];
    }

    @Put(':idVehiculo')
    @UseGuards(JwtAuthGuard)
    actualizarVehiculo(@Param('idVehiculo', ParseIntPipe) idVehiculo: number, @Body() body: any) {
        const { propietario, marca, modelo, placas } = body;
        return this.vehiculoService.actualizarVehiculo(idVehiculo, propietario, marca, modelo, placas);
    }

    @Delete(':idVehiculo')
    @UseGuards(JwtAuthGuard)
    eliminarVehiculo(@Param('idVehiculo', ParseIntPipe) idVehiculo: number) {
        return this.vehiculoService.eliminarVehiculo(idVehiculo);
    }

}
