import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trabajo } from './dto/trabajo.entity';
import { actualizarTrabajo } from './dto/update-trabajo.dto';

@Injectable()
export class TrabajosService {
    constructor(
        @InjectRepository(Trabajo)
        private readonly trabajoRepository: Repository<Trabajo>
    ) { }

    getTrabajos(){  
        return this.trabajoRepository.find();
    }

    async getTrabajo(idTrabajo: number){
        const trabajoFound = await this.trabajoRepository.findOne({
            where: {
                idTrabajo,
            },
        });
        if(!trabajoFound){
            return new HttpException('Trabajo no encontrado', HttpStatus.NOT_FOUND);
        }
        return trabajoFound;
    }

    async crearTrabajo(tipo: Trabajo){
        const trabajoFound = await this.trabajoRepository.findOne({
            where: {
                tipoTrabajo: tipo.tipoTrabajo
            }
        })
        if(trabajoFound){
            return new HttpException('Trabajo ya existente', HttpStatus.CONFLICT)
        }
        const newTrabajo = this.trabajoRepository.create(tipo);
        return this.trabajoRepository.save(newTrabajo)
    }

    async deleteTrabajo(idTrabajo: number){
        const result = await this.trabajoRepository.delete({idTrabajo});
        if(result.affected === 0){
            return new HttpException('Trabajo no encontrado', HttpStatus.NOT_FOUND );
        }
        return result;
    }

    async updateTrabajo(idTrabajo: number, tipo: actualizarTrabajo){
        const trabajoFound = await this.trabajoRepository.findOne({
            where: {
                idTrabajo,
            },
        });
        if(!trabajoFound){
            return new HttpException(' Trabajo no encontrado', HttpStatus.NOT_FOUND );
        }
        const updateTrabajo = Object.assign(trabajoFound, tipo);
        return this.trabajoRepository.save(updateTrabajo);
    }

}