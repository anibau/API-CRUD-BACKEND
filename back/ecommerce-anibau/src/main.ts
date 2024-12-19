import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './modulos/Auth/auth.service';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      exceptionFactory(errors) {
          const cleanErrors= errors.map(error=>{
            return {property: error.property, constraints: error.constraints}
          });
          return new BadRequestException({
            alert: 'Se detectaron los siguientes errores:',
            errors: cleanErrors
          })
      },
    })
  )
  app.use(LoggerMiddleware);
  const adminUserService= app.get(AuthService);
  await adminUserService.createAdminUser();

  const swaggerConfig= new DocumentBuilder()
                        .setTitle('api-ecommerce-backend')
                        .setDescription('Esta es una Api creada con NestJS desarrollada como proyecto del modulo 4 de la especializacion backend de la carrera FullStack Developer de Henry')
                        .setVersion('1.0')
                        .addBearerAuth()
                        .build();
  const document= SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('API', app, document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
