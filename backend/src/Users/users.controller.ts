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
        @Body('Rol') rol: number
    ) {

        try {
            const status = await this.usuariosService.crearUsuario(name, apellido, passwrd, email, rol);
            return status;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    @Get('validateToken')
    @UseGuards(JwtAuthGuard)
    validateToken(@Request() req) {
        return { success: true, user: req.user }; // req.user contiene la información del usuario decodificada
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async obtenerUsuarioPorID(@Param('id') userID: number) {
        try {
            const user = await this.usuariosService.obtenerUsuarioPorID(userID);
            return user;
        } catch (error) {
            throw new Error(error);
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
        @Body('Name') name?: string,
        @Body('Apellido') apellido?: string,
        @Body('Passwrd') passwrd?: string,
        @Body('Email') email?: string,
        @Body('Rol') rol?: number,
    ) {
        const updatedUser = await this.usuariosService.actualizarUsuario(userID, name, apellido, passwrd, email, rol);
        return updatedUser;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async eliminarUsuario(@Param('id') userID: number) {
        const deleted = await this.usuariosService.eliminarUsuario(userID);
        return deleted;
    }

    @Post('login')
    async login(@Body('Email') Email: string, @Body('Passwrd') Passwrd: string) {
        const user = await this.usuariosService.findByEmail(Email, Passwrd);

        if (!user) {
            return { message: 'Credenciales incorrectas' };
        }

        return { token: user.access_token };
    }

}