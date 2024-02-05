import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
require('dotenv').config();

@Controller('correo')
export class CorreoController {
  private verificationCodes: Record<string, string> = {};

  @Post()
  async enviarCorreo(@Body('correo') correo: string) {
    const destinatario = correo;
    const sender = process.env.EMAIL_SENDER;

    function generateVerificationCode(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const verificationCode = generateVerificationCode();
    const mailOptions = {
      from: sender,
      to: destinatario,
      subject: 'Código de verificación',
      text: `Su código de verificación es: ${verificationCode}`,
    };

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      //await transporter.sendMail(mailOptions); 

      console.error("PARA PROBAR QUE FUNCIONE EL MANDAR CORREO QUITA EL COMENTARIO DE ARRIBA, RECUERDA CREAR UNA CUENTA Y PONER TU PROPIO CORREO")
      console.log('Correo enviado');
      console.log('Codigo de verificación: ', verificationCode);


      // Almacenar el código de verificación junto con el destinatario para su posterior verificación
      this.verificationCodes[destinatario] = verificationCode;

      return 'Correo enviado con éxito';
    } catch (error) {
      console.error(`Error al enviar el correo: ${error}`);
      throw new Error('Error al enviar el correo');
    }
  }

  @Post('/validar')
  verificarCodigo(
    @Body('codigo') codigo: string,
    @Body('correo') correo: string,
  ) {
    const storedCode = this.verificationCodes[correo];

    if (!storedCode) {
      throw new Error('Código de verificación no encontrado');
    }

    if (codigo === storedCode) {
      delete this.verificationCodes[correo]; // Limpiar el código después de usarlo
      return true;
    } else {
      throw new Error('Código de verificación incorrecto');
    }
  }
}
