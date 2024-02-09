import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './Users/users.module';
import { VehiculoModule } from './Vehiculos/vehiculo.module';
import { TrabajosModule } from './Trabajos/servicios.module';
import { JwtAuthGuard } from './Auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { MaterialesModule } from './Materiales/materiales.module';
import { CorreoController } from './correo/correo.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mecanicar',
      entities: [__dirname + '/*/.entity{.ts,.js}'],
      synchronize: true
    }), UsuariosModule, VehiculoModule, TrabajosModule, MaterialesModule],
  controllers: [CorreoController],
  providers: [JwtService, JwtAuthGuard],
}) 
export class AppModule { }