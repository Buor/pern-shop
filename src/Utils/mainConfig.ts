import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import pool from '../Utils/pool'
import User from '../Entities/User'
import UserData from '../Entities/UserData'
import Basket from '../Entities/Basket'
import Brand from '../Entities/Brand'
import Product from '../Entities/Product'
import ProductInfo from '../Entities/ProductInfo'
import Rating from '../Entities/Rating'
import Type from '../Entities/Type'
import { AuthModule } from '../Modules/auth.module'
import { BrandModule } from '../Modules/brand.module'
import { RatingModule } from '../Modules/rating.module'
import { ProductModule } from '../Modules/product.module'
import { TypeModule } from '../Modules/type.module'
import { TypeProperty } from '../Entities/TypeProperty'
import { TypePropertyValue } from '../Entities/TypePropertyValue'

export function getRouteModules() {
    return [AuthModule, BrandModule, RatingModule, TypeModule, ProductModule]
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