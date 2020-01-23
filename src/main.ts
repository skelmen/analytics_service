import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';
import { ApiModule } from './modules/api/api.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.setGlobalPrefix('api');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(requestIp.mw())

    //Swagger Docs Module
    if (process.env.NODE_ENV === 'development') {
        const options = new DocumentBuilder()
            .setTitle('Playbuzz API Docs')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, options, {
            include: [ApiModule],
        });

        SwaggerModule.setup('api/doc', app, document, {
            customSiteTitle: 'Playbuzz API Documentation'
        });
    }

    await app.listen(3000);
}
bootstrap();
