import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './Users/users.controller';
import { UsuariosModule } from './Users/users.module';
import { JwtAuthGuard } from './Auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { VehiculoModule } from './Vehiculos/vehiculo.module';
import { TrabajosModule } from './Trabajos/servicios.module';

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
    }), UsuariosModule, VehiculoModule, TrabajosModule],
  controllers: [UsuariosController],
  providers: [JwtService,JwtAuthGuard],
}) 
export class AppModule { }