import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Product from '../Entities/Product'
import { ProductService } from '../Services/product.service'
import { ProductController } from '../Controllers/product.controller'

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [TypeOrmModule.forFeature([Product])]
})
export class ProductModule{}