import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './users.controller';
import { UsuariosService } from './users.service';
import { Usuario } from './dto/user.entity';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();

@Module({
    imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
        secret: process.env.JWT_SECRET, 
        signOptions: { expiresIn: '3h' }, // Set the expiration time for the token
    })],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService], 
})
export class UsuariosModule { }