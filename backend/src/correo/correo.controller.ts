import { Controller, Post, Body } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
require('dotenv').config();

@Controller('correo')
export class CorreoController {

    @Post()
    async enviarCorreo(
        @Body("correo") correo: string,
        @Body("tipo") titulo: string
    ): Promise<string> {
        const destinatario = correo;
        const asunto = titulo;
        const sender = process.env.EMAIL_SENDER; 

        let mailOptions: { from: string; to: string; subject: string; text: string; };

        function generateVerificationCode(): string {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }

        if (asunto === "Recuperar contraseña") {
            mailOptions = {
                from: sender,
                to: destinatario,
                subject: asunto,
                text: "Texto personalizado para recuperar contraseña",
            };
        } else if (asunto === "Código de verificación") {
            const verificationCode = generateVerificationCode();
            mailOptions = {
                from: sender,
                to: destinatario,
                subject: asunto,
                text: `Su código de verificación es: ${verificationCode}`,
            };
        } else {
            throw new Error('Asunto no reconocido');
        }

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            await transporter.sendMail(mailOptions);
            console.log("Correo enviado");
            return 'Correo enviado con éxito';
        } catch (error) {
            console.error(`Error al enviar el correo: ${error.message}`);
            throw new Error('Error al enviar el correo');
        }

    }

}
