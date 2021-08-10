import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateProductDTO } from '../DTO/createProductDTO'
import { ProductService } from '../Services/product.service'

@Controller('/product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('/')
    async getProduct(@Body() reqBody) {
        console.log(reqBody);
        return 'Success'
    }

    @Post('/')
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        return await this.productService.createProduct(createProductDTO);
    }
}