import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from './users.service';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post()
    async crearUsuario(
        @Body('Name') name: string,
        @Body('Apellido') apellido: string,
        @Body('Passwrd') passwrd: string,
        @Body('Email') email: string,
        @Body('Rol') rol?: number,
    ) {
        try {
            const newUser = await this.usuariosService.crearUsuario(name, apellido, passwrd, email, rol);
            return newUser;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    @Get(':id')
    async obtenerUsuarioPorID(@Param('id') userID: number) {
        try {
            const user = await this.usuariosService.obtenerUsuarioPorID(userID);
            return user;
        } catch (error) {
            return { message: error };
        }

    }

    @Get()
    async obtenerUsuarios() {
        const users = await this.usuariosService.obtenerUsuarios();
        return users;
    }

    @Put(':id')
    async actualizarUsuario(
        @Param('id') userID: number,
        @Body('Name') name: string,
        @Body('Apellido') apellido: string,
        @Body('Passwrd') passwrd: string,
        @Body('Email') email: string,
        @Body('Rol') rol: number,
    ) {
        const updatedUser = await this.usuariosService.actualizarUsuario(userID, name, apellido, passwrd, email, rol);
        return updatedUser;
    }

    @Delete(':id')
    async eliminarUsuario(@Param('id') userID: number) {
        await this.usuariosService.eliminarUsuario(userID);
        return { message: 'Usuario eliminado exitosamente' };
    }

    @Post('login')
    async login(@Body('Email') Email: string, @Body('Passwrd') Passwrd: string) {
        const user = await this.usuariosService.validateUser(Email, Passwrd);

        if (!user) {
            return { message: 'Credenciales invalidas' };
        }

        return { token: user.access_token };
    }
}