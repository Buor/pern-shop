import { Module } from '@nestjs/common'
import { ProductService } from '../services/product.service'
import { ProductController } from '../controllers/product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import Product from '../entities/Product'
import Brand from '../entities/Brand'

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [TypeOrmModule.forFeature([Product, Brand])]
})
export class ProductModule{}