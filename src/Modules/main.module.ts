import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import pool from '../Utils/pool'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { Connection } from 'typeorm'

import User from '../Entities/User'
import UserData from '../Entities/UserData'
import Basket from '../Entities/Basket'
import Brand from '../Entities/Brand'
import Product from '../Entities/Product'
import ProductInfo from '../Entities/ProductInfo'
import Rating from '../Entities/Rating'
import Type from '../Entities/Type'
import { ConfigModule } from '@nestjs/config'
import { AuthorizeMiddleware } from '../Utils/Middlewares/authorizeMiddleware'
import { ProductModule } from './product.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            url: pool,
            type: 'postgres',
            synchronize: true,
            entities: [User, UserData, Basket, Brand, Product, ProductInfo, Rating, Type],
            //todo
            // ssl: {
            //   rejectUnauthorized: false
            // }
        }),
        AuthModule,
        ProductModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'client/build'),
        }),
        ConfigModule.forRoot(),
    ],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(AuthorizeMiddleware)
            .forRoutes('/product', '/auth/is-verify')
    }
}