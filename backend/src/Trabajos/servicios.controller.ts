import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TrabajosService } from './servicios.service';

@Controller('trabajos')
export class TrabajosController {
    constructor(private readonly trabajosService: TrabajosService) { }
}
