import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { TrabajosService } from './servicios.service';


@Controller('trabajos')
export class TrabajosController {
    constructor(private readonly trabajosService: TrabajosService) { }

    @Get(':idTrabajo')
    obtenerTrabajoPorID(@Param('idTrabajo', ParseIntPipe) idTrabajo: number) {
        return this.trabajosService.obtenerTrabajoPorID(idTrabajo);
    }

    @Get()
    obtenerTrabajos() {
        return this.trabajosService.obtenerTrabajos();
    }

    @Put(':idTrabajo')
    actualizarTrabajo(@Param('idTrabajo', ParseIntPipe) idTrabajo: number, @Body() body: any) {
        const { descripcion, costoMaterial, tipoTrabajo, estadoVehiculo } = body;
        return this.trabajosService.actualizarTrabajo(idTrabajo, descripcion, costoMaterial, tipoTrabajo, estadoVehiculo);
    }

    @Delete(':idTrabajo')
    eliminarTrabajo(@Param('idTrabajo', ParseIntPipe) idTrabajo: number) {
        return this.trabajosService.eliminarTrabajo(idTrabajo);
    }
}
