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
            const results = await this.trabajoRepository.query(`CALL ObtenerTrabajoPorID(?)`, [idTrabajo]);
            return results;
        } catch (error) {
            console.error(error)
            throw new HttpException('Error al obtener el trabajo por ID', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerTrabajos(obtenerTodos: boolean, idUsuario: number) {
        try {
            return await this.trabajoRepository.query(`CALL ObtenerTrabajos(?, ?)`, [obtenerTodos, idUsuario]);
        } catch (error) {
            console.error(error)
            throw new HttpException('Error al obtener la lista de trabajos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerTrabajosCount(idUsuario: number) {
        try {
            const results = await this.trabajoRepository.query(`CALL CountTrabajos(?)`, [idUsuario]);
            // El primer conjunto de resultados tiene los trabajos pendientes
            const pendientes = results[0][0].pendientes;

            // El segundo conjunto de resultados tiene los trabajos terminados
            const terminados = results[0][0].terminados;

            return { pendientes, terminados };
        } catch (error) {
            console.error(error)
            throw new HttpException('Error al obtener el contador de trabajos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async crearTrabajo(descripcion: string, tipoTrabajo: number, vehiculo: number, encargado: number){
        const result = await this.trabajoRepository.query('CALL insertarTrabajo (?,?,?,?)', [descripcion, tipoTrabajo, vehiculo, encargado])

        return result;
    }

    async actualizarTrabajo(idTrabajo: number, descripcion?: string, tipoTrabajo?: number, estado?: boolean, vehiculo?: number, encargado?: number, horas?: number) {
        try {
            const result = await this.trabajoRepository.query(`CALL ActualizarTrabajo(?, ?, ?, ?, ?, ?, ?)`, [idTrabajo, descripcion, tipoTrabajo, estado, vehiculo, encargado, horas]);
            return result;
        } catch (error) {
            console.error(error)
            throw new HttpException('Error al actualizar el trabajo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarTrabajo(idTrabajo: number) {
        try {
            return await this.trabajoRepository.query(`CALL EliminarTrabajo(?)`, [idTrabajo]);
        } catch (error) {
            console.error(error)
            throw new HttpException('Error al eliminar el trabajo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}