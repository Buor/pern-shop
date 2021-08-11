import { AuthModule } from './auth.module'
import { BrandModule } from './brand.module'
import { RatingModule } from './rating.module'
import { TypeModule } from './type.module'
import { ProductModule } from './product.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import pool from '../Utils/pool'
import User from '../Entities/User'
import UserData from '../Entities/UserData'
import Basket from '../Entities/Basket'
import Brand from '../Entities/Brand'
import Product from '../Entities/Product'
import ProductInfo from '../Entities/ProductInfo'
import Rating from '../Entities/Rating'
import Type from '../Entities/Type'

export function getRouteModules() {
    return [AuthModule, BrandModule, RatingModule, TypeModule, ProductModule]
}

export function getConfigModules() {
    return [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'client/build'),
        }),
        ConfigModule.forRoot(),
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
    ]
}