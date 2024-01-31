import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './Users/users.controller';
import { UsuariosModule } from './Users/users.module';
import { JwtAuthGuard } from './Auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'LW%8r2%T6JB*5X&MBGd5%$^28',
      database: 'mecanicar',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }), UsuariosModule],
  controllers: [UsuariosController],
  providers: [JwtService,JwtAuthGuard],
}) 
export class AppModule { }