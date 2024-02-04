import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];


    if (!token) {
      return false; // No se proporcionó un token en los encabezados
    }

    try {
      const decoded = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
      request.user = decoded; // Agrega el usuario decodificado al objeto de solicitud
      return true;
    } catch (error) {
      return false; // El token no es válido
    }
  }
}
