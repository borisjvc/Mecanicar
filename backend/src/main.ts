import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';


const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key', 'utf8'),
  cert: fs.readFileSync('./secrets/cert.crt', 'utf8'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: true, // Reemplaza con el origen de tu aplicación React
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();

