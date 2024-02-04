import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { TrabajosService } from './servicios.service';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';


@Controller('trabajos')
export class TrabajosController {
    constructor(private readonly trabajosService: TrabajosService) { }

    @Get(':idTrabajo')
    @UseGuards(JwtAuthGuard)
    obtenerTrabajoPorID(@Param('idTrabajo', ParseIntPipe) idTrabajo: number) {
        return this.trabajosService.obtenerTrabajoPorID(idTrabajo);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    obtenerTrabajos() {
        return this.trabajosService.obtenerTrabajos();
    }

    @Put(':idTrabajo')
    @UseGuards(JwtAuthGuard)
    async actualizarTrabajo(@Param('idTrabajo', ParseIntPipe) idTrabajo: number, @Body() body: any, @Request() req) {
        const { descripcion, costoMaterial, tipoTrabajo, estado, vehiculo, encargado } = body;
        const trabajoExistente = await this.trabajosService.obtenerTrabajoPorID(idTrabajo);

        //verificar si el usuario tiene permisos para realizar la actualización
        if (req.user.rol !== 1) {
            //si el usuario no tiene rol 1, verificar si el estado anterior era 0 y el nuevo es 1
            if (trabajoExistente.estadoTrabajo === 0 && estado === 1) {
                return { meesage: "No tienes los permisos necesarios para esta acción" };
            }
        }

        return this.trabajosService.actualizarTrabajo(idTrabajo, descripcion, costoMaterial, tipoTrabajo, estado, vehiculo, encargado);
    }

    @Delete(':idTrabajo')
    @UseGuards(JwtAuthGuard)
    eliminarTrabajo(@Param('idTrabajo', ParseIntPipe) idTrabajo: number, @Request() req ) {
        if(req.rol === 1)
            return this.trabajosService.eliminarTrabajo(idTrabajo);
        
        return { message: "No tienes los permisos necesarios para borrar" }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    crearTrabajo(@Body('descripcion') descripcion: string,@Body('tipo')  tipoTrabajo:number , @Body('vehiculo') vehiculo:number, @Request() encargado){
        return this.trabajosService.crearTrabajo(descripcion, tipoTrabajo, vehiculo, encargado.idUsuario);
    }
}
