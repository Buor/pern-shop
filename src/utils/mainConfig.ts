import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import pool from './/pool'
import User from '../entities/User'
import UserData from '../entities/UserData'
import Basket from '../entities/Basket'
import Brand from '../entities/Brand'
import Product from '../entities/Product'
import ProductInfo from '../entities/ProductInfo'
import Rating from '../entities/Rating'
import Type from '../entities/Type'
import { AuthModule } from '../modules/auth.module'
import { BrandModule } from '../modules/brand.module'
import { RatingModule } from '../modules/rating.module'
import { ProductModule } from '../modules/product.module'
import { TypeModule } from '../modules/type.module'
import { TypeProperty } from '../entities/TypeProperty'
import { TypePropertyValue } from '../entities/TypePropertyValue'
import { UserModule } from '../modules/user.module'
import { BasketModule } from '../modules/basket.module'

export function getRouteModules() {
    return [
        AuthModule,
        BrandModule,
        RatingModule,
        TypeModule,
        ProductModule,
        UserModule,
        BasketModule
    ]
}

export function getConfigModules() {

    const typeOrmConfig: TypeOrmModuleOptions = {
        url: pool,
        type: 'postgres',
        synchronize: true,
        entities: [User, UserData, Basket, Brand, Product, ProductInfo, Rating, Type, TypeProperty, TypePropertyValue],
        ssl: process.env.NODE_ENV === 'production'
            ? {
                rejectUnauthorized: false
            }
            : undefined
    }

    const configs = [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(typeOrmConfig)
    ]

    if (process.env.NODE_ENV === 'production') {
        configs.push(ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'client/build')
        }))
    }


    return configs
}