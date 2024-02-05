import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materiales } from './dto/materiales.entity';

@Injectable()
export class MaterialesService {
    constructor(
        @InjectRepository(Materiales) private readonly materialesRepository: Repository<Materiales>,
    ) {}

    async insertarMaterial(idTrabajo: number, nombre: string, precio: number){
        try {
            const idMaterial = await this.materialesRepository.query(`CALL InsertarMaterial(?, ?)`, [nombre, precio]);
            await this.materialesRepository.query(`CALL InsertarMaterialEnTrabajo(?, ?)`, [idTrabajo, idMaterial[0][0].idMaterial])
        } catch (error) {
            throw new HttpException('Error al insertar el material', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerMaterialPorID(idMaterial: number){
        try {
            const result = await this.materialesRepository.query(`CALL ObtenerMaterialPorID(?)`, [idMaterial]);
            return result[0][0] || null;
        } catch (error) {
            throw new HttpException('Error al obtener el material', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async actualizarMaterial(idMaterial: number, nombre: string, precio: number){
        try {
            await this.materialesRepository.query(`CALL ActualizarMaterial(?, ?, ?)`, [idMaterial, nombre, precio]);
        } catch (error) {
            throw new HttpException('Error al actualizar el material', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarMaterial(idMaterial: number){
        try {
            await this.materialesRepository.query(`CALL EliminarMaterial(?)`, [idMaterial]);
        } catch (error) {
            throw new HttpException('Error al eliminar el material', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
