import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './dto/vehiculo.entity';

@Injectable()
export class VehiculoService {
    constructor(
        @InjectRepository(Vehiculo)
        private readonly vehiculoRepository: Repository<Vehiculo>
    ) { }

    async obtenerVehiculoPorID(idVehiculo: number){
        try{
            return await this.vehiculoRepository.query(`CALL ObtenerVehiculoPorID(?)`), [idVehiculo];
        } catch(error){
            throw new HttpException('Error al obtener el vehiculo por ID', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async obtenerVehiculos() {
        try {
            return await this.vehiculoRepository.query(`CALL ObtenerVehiculos()`);
        } catch (error) {
            throw new HttpException('Error al obtener la lista de vehículos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async crearVehiculo(propietario: string, marca: string, modelo: string, placas: string) {
        const result = await this.vehiculoRepository.query('CALL insertarVehiculo (?,?,?,?)', [propietario, marca, modelo, placas])

        return result;
    }

    async actualizarVehiculo(idVehiculo: number, propietario: string, marca: string, modelo: string, placas: string) {
        try {
            return await this.vehiculoRepository.query(`CALL ActualizarVehiculo(?, ?, ?, ?, ?)`, [idVehiculo, propietario, marca, modelo, placas]);
        } catch (error) {
            throw new HttpException('Error al actualizar el vehículo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async eliminarVehiculo(idVehiculo: number) {
        try {
            return await this.vehiculoRepository.query(`CALL EliminarVehiculo(?)`, [idVehiculo]);
        } catch (error) {
            throw new HttpException('Error al eliminar el vehículo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
