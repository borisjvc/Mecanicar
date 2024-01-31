import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trabajo } from './dto/trabajo.entity';

@Injectable()
export class TrabajosService {
    constructor(
        @InjectRepository(Trabajo)
        private readonly trabajoRepository: Repository<Trabajo>
    ) { }
}