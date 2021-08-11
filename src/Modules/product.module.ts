import { Module } from '@nestjs/common'
import { ProductService } from '../Services/product.service'
import { ProductController } from '../Controllers/product.controller'

@Module({
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule{}