import { Module } from '@nestjs/common'
import { ProductService } from '../services/product.service'
import { ProductController } from '../controllers/product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import Product from '../entities/Product'
import Brand from '../entities/Brand'
import ProductInfo from '../entities/ProductInfo'
import Type from '../entities/Type'

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [TypeOrmModule.forFeature([Product, ProductInfo, Brand, Type])]
})
export class ProductModule {
}