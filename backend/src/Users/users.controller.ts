import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './users.service';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async crearUsuario(
        @Body('Name') name: string,
        @Body('Apellido') apellido: string,
        @Body('Passwrd') passwrd: string,
        @Body('Email') email: string,
        @Body('Rol') rol: number,
        @Request() req
    ) {
        const authenticatedUser = req.user;

        if (!authenticatedUser || authenticatedUser.rol !== 'administrador') {
            return { message: 'Permiso denegado. Solo los administradores pueden eliminar usuarios.' };
        }

        try {
            const newUser = await this.usuariosService.crearUsuario(name, apellido, passwrd, email, rol);
            return newUser;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async obtenerUsuarioPorID(@Param('id') userID: number) {
        try {
            const user = await this.usuariosService.obtenerUsuarioPorID(userID);
            return user;
        } catch (error) {
            return { message: error };
        }

    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async obtenerUsuarios() {
        const users = await this.usuariosService.obtenerUsuarios();
        return users;
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async eliminarUsuario(@Param('id') userID: number, @Request() req) {
        const authenticatedUser = req.user;
        if (!authenticatedUser || authenticatedUser.rol !== 'administrador') {
            return { message: 'Permiso denegado. Solo los administradores pueden eliminar usuarios.' };
        }

        await this.usuariosService.eliminarUsuario(userID);
        return { message: 'Usuario eliminado exitosamente' };
    }

    @Post('login')
    async login(@Body('Email') Email: string, @Body('Passwrd') Passwrd: string) {
        const user = await this.usuariosService.findByEmail(Email, Passwrd);

        if (!user) {
            return { message: 'Credenciales invalidas' };
        }

        return { token: user.access_token };
    }

    @Get('validateToken')
    @UseGuards(JwtAuthGuard)
    validateToken() {
      return { success: true }; // req.user contiene la información del usuario decodificada
    }
}