import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { TrabajosService } from './servicios.service';
import { Trabajo } from './dto/trabajo.entity';
import { actualizarTrabajo } from './dto/update-trabajo.dto';

@Controller('trabajos')
export class TrabajosController {
    constructor(private readonly trabajosService: TrabajosService) { }

    @Get()
    getTrabajos(): Promise<Trabajo[]>{
        return this.trabajosService.getTrabajos();
    }

    @Get(':id')
    getTrabajo(@Param('id', ParseIntPipe) idTrabajo: number){
        return this.trabajosService.getTrabajo(idTrabajo);
    }

    @Post()
    crearTrabajo(@Body() newTrabajo: Trabajo){
        return this.trabajosService.crearTrabajo(newTrabajo);
    }

    @Delete(':id')
    deleteTrabajo(@Param(':id', ParseIntPipe) idTrabajo: number){
        return this.trabajosService.deleteTrabajo(idTrabajo);
    }

    @Patch(':id')
    updateTrabajo(@Param('id', ParseIntPipe) idTrabajo: number, @Body() tipo: actualizarTrabajo){
        return this.trabajosService.updateTrabajo(idTrabajo, tipo);
    }

}
