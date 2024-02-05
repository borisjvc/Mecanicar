import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards, Request, Req } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('materiales')
export class MaterialesController {
    constructor(private readonly materialesService: MaterialesService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async insertarMaterial(@Body('idTrabajo') idTrabajo:number, @Body('nombre') nombre: string, @Body('precio') precio: number) {
        await this.materialesService.insertarMaterial(idTrabajo, nombre, precio);
    }

    @Get(':idMaterial')
    @UseGuards(JwtAuthGuard)
    async obtenerMaterialPorID(@Param('idMaterial', ParseIntPipe) idMaterial: number){
        return this.materialesService.obtenerMaterialPorID(idMaterial);
    }

    @Put(':idMaterial')
    @UseGuards(JwtAuthGuard)
    async actualizarMaterial(
        @Param('idMaterial', ParseIntPipe) idMaterial: number,
        @Body('nombre') nombre: string,
        @Body('precio') precio: number,
    ){
        await this.materialesService.actualizarMaterial(idMaterial, nombre, precio);
    }

    @Delete(':idMaterial')
    @UseGuards(JwtAuthGuard)
    async eliminarMaterial(@Param('idMaterial', ParseIntPipe) idMaterial: number){
        await this.materialesService.eliminarMaterial(idMaterial);
    }
}