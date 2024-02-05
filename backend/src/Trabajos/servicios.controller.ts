import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, Request, Req } from '@nestjs/common';
import { TrabajosService } from './servicios.service';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';


@Controller('trabajos')
export class TrabajosController {
    constructor(private readonly trabajosService: TrabajosService) { }

    @Get('byId/:idTrabajo')
    @UseGuards(JwtAuthGuard)
    obtenerTrabajoPorID(@Param('idTrabajo', ParseIntPipe) idTrabajo: number) {
        return this.trabajosService.obtenerTrabajoPorID(idTrabajo);
    }

    @Get('/count')
    @UseGuards(JwtAuthGuard)
    obtenerContador(@Request() req) {
        return this.trabajosService.obtenerTrabajosCount(req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async obtenerTrabajos(@Request() req) {
        if(req.user.rol === 1){
            const res = await this.trabajosService.obtenerTrabajos(true, req.user.id)
            return { trabajos: res[0], nombre: req.user.name}
        }

        const res = await this.trabajosService.obtenerTrabajos(false, req.user.id)
        return { trabajos: res[0], nombre: req.user.name}
    }

    @Put(':idTrabajo')
    @UseGuards(JwtAuthGuard)
    async actualizarTrabajo(
        @Request() req,
        @Param('idTrabajo', ParseIntPipe) idTrabajo: number,
        @Body('descripcion') descripcion?: string,
        @Body('tipoTrabajo') tipoTrabajo?: number,
        @Body('horas') horas?: number,
        @Body('estado') finalizado?: boolean,
        @Body('vehiculo') vehiculo?: number
    ) {
        const trabajoExistente = await this.trabajosService.obtenerTrabajoPorID(idTrabajo);
    
        // Verificar si el usuario tiene permisos para realizar la actualización
        if (req.user.rol !== 1) {
            // Si el usuario no tiene rol 1, verificar si el estado anterior era finalizado
            if (trabajoExistente.estadoTrabajo === 1) {
                return { message: "No tienes los permisos necesarios para esta acción" };
            }
        }
        
        return this.trabajosService.actualizarTrabajo(
            idTrabajo,
            descripcion,
            tipoTrabajo,
            finalizado,
            vehiculo,
            req.user.id,
            horas
        );
    }
    

    @Delete(':idTrabajo')
    @UseGuards(JwtAuthGuard)
    eliminarTrabajo(@Param('idTrabajo', ParseIntPipe) idTrabajo: number, @Request() req ) {
        if(req.user.rol === 1)
            return this.trabajosService.eliminarTrabajo(idTrabajo);
        
        return { message: "No tienes los permisos necesarios para borrar" }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    crearTrabajo(@Body('descripcion') descripcion: string,@Body('tipo')  tipoTrabajo:number , @Body('vehiculo') vehiculo:number, @Request() encargado){
        return this.trabajosService.crearTrabajo(descripcion, tipoTrabajo, vehiculo, encargado.user.id);
    }
}
