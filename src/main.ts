import { NestFactory } from '@nestjs/core'
import { MainModule } from './modules/main.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(MainModule)

    if (process.env.NODE_ENV === 'development') {
        app.enableCors({
            origin: 'http://localhost:3000',
            credentials: true,
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
        })
    }

    app.setGlobalPrefix('/api')
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }))

    await app.listen(process.env.PORT || 5000)
}

bootstrap()
