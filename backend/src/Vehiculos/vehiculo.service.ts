import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './dto/vehiculo.entity';
import { actualizarVehiculo } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculoService {
    constructor(
        @InjectRepository(Vehiculo)
        private readonly vehiculoRepository: Repository<Vehiculo>
    ) { }

    getVehiculos(){  
        return this.vehiculoRepository.find();
    }

    async getVehiculo(idVehiculo: number){
        const vehiculoFound = await this.vehiculoRepository.query('CALL ObtenerVehiculoPorID (?)', [idVehiculo]);
        return vehiculoFound;
    }

    async crearVehiculo(nombre: string, marca: string, modelo: string, placas: string){
        const result = await this.vehiculoRepository.query('CALL insertarVehiculo (?,?,?,?)', [nombre, marca, modelo, placas])
      
        return result;
    }

    async deleteVehiculo(idVehiculo: number){
        const result = await this.vehiculoRepository.delete({idVehiculo});
        if(result.affected === 0){
            return new HttpException('Vehiculo no encontrado', HttpStatus.NOT_FOUND );
        }
        return result;
    }

    async updateVehiculo(idVehiculo: number, nombre: actualizarVehiculo){
        const vehiculoFound = await this.vehiculoRepository.findOne({
            where: {
                idVehiculo,
            },
        });
        if(!vehiculoFound){
            return new HttpException('Vehiculo no encontrado', HttpStatus.NOT_FOUND );
        }
        const updateVehiculo = Object.assign(vehiculoFound, nombre);
        return this.vehiculoRepository.save(updateVehiculo);
    }

}
