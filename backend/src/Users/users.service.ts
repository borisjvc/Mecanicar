import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './dto/user.entity';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly connection: Connection, // conexión a la base de datos
        private readonly jwtService: JwtService,
    ) { }

    async crearUsuario(name: string, apellido: string, passwrd: string, email: string, rol?: number) {
        //if(rol actual es admin entonces)
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Verificar si ya existe un usuario con el mismo correo electrónico
            const existingUser = await queryRunner.query('SELECT * FROM Usuarios WHERE correo = ?', [email]);

            if (existingUser.length > 0) {
                throw new Error('Ya existe un usuario con este correo electrónico.');
            }

            else {
                const hashedPassword = await bcrypt.hash(passwrd, 10);
                // Si no existe, proceder con la creación del usuario
                await queryRunner.query('CALL InsertarUsuario(?, ?, ?, ?, ?)', [name, apellido, email, hashedPassword, rol]);
                await queryRunner.commitTransaction();
                return { message: "Usuario creado exitosamente"};
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return { message: "Error al crear usuario: ", error};
        } finally {
            await queryRunner.release();
        }

    }

    async obtenerUsuarioPorID(userID: number): Promise<Usuario> {
        const result = await this.usuarioRepository.query('CALL ObtenerUsuarioPorID(?)', [userID]);
        return result[0];
    }

    async obtenerUsuarios(): Promise<Usuario[]> {
        const result = await this.usuarioRepository.query('CALL ObtenerUsuarios');
        return result[0];
    }

    async actualizarUsuario(userID: number, name?: string, apellido?: string, passwrd?: string, email?: string, rol?: number): Promise<{ message?: string }> {
        try {
            const hashedPassword = await bcrypt.hash(passwrd, 10);
            const result = await this.usuarioRepository.query('CALL ActualizarUsuario(?, ?, ?, ?, ?, ?)', [userID, name, apellido, email, hashedPassword, rol]);

            // Verificar el resultado de la actualización
            if (result && result.affectedRows > 0) {
                return { message: 'Actualización exitosa' };
            } else {
                throw new Error('No se pudo actualizar el usuario.');
            }
        } catch (error) {
            return { message: error.message || 'Error al actualizar el usuario.' };
        }
    }

    async eliminarUsuario(userID: number): Promise<{message: string}> {
        try{
            await this.usuarioRepository.query('CALL EliminarUsuario(?)', [userID]);
            return { message: "Usuario eliminado exitosamente" }
        }catch(error){
            return { message: `Error eliminar al usuario ${error}` }
        }
        
    }
    

    async findByEmail(email: string, password: string): Promise<{ access_token: string } | null> {
        const result = await this.usuarioRepository.query('CALL usp_ValidateUser(?)', [email]);
        const user = result[0];

        if (user.length === 0) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].contrasena);

        if (!isPasswordValid) {
            return null;
        }

        const payload = { id: user[0].idUsuario, name: user[0].nombre, email: user[0].correo, rol: user[0].rol };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}

