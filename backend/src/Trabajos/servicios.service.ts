import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trabajo } from './dto/trabajo.entity';

@Injectable()
export class TrabajosService {
    constructor(
        @InjectRepository(Trabajo)
        private readonly trabajoRepository: Repository<Trabajo>
    ) { }

    async obtenerTrabajoPorID(idTrabajo: number) {
        try {
            return await this.trabajoRepository.query(`CALL ObtenerTrabajoPorID(?)`, [idTrabajo]);
        } catch (error) {
            throw new HttpException('Error al obtener el trabajo por ID', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerTrabajos() {
        try {
            return await this.trabajoRepository.query(`CALL ObtenerTrabajos()`);
        } catch (error) {
            throw new HttpException('Error al obtener la lista de trabajos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async crearTrabajo(descripcion: string, costoMaterial: number, tipoTrabajo: string, estadoVehiculo: boolean){
        const result = await this.trabajoRepository.query('CALL insertarTrabajo (?,?,?,?)', [descripcion, costoMaterial, tipoTrabajo, estadoVehiculo])

        return result;
    }

    async actualizarTrabajo(idTrabajo: number, descripcion: string, costoMaterial: number, tipoTrabajo: string, estadoVehiculo: boolean) {
        try {
            return await this.trabajoRepository.query(`CALL ActualizarTrabajo(?, ?, ?, ?, ?)`, [idTrabajo, descripcion, costoMaterial, tipoTrabajo, estadoVehiculo]);
        } catch (error) {
            throw new HttpException('Error al actualizar el trabajo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarTrabajo(idTrabajo: number) {
        try {
            return await this.trabajoRepository.query(`CALL EliminarTrabajo(?)`, [idTrabajo]);
        } catch (error) {
            throw new HttpException('Error al eliminar el trabajo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}