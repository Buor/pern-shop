import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateProductDTO } from '../DTO/createProductDTO'
import { ProductService } from '../Services/product.service'

@Controller('/product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('/all')
    async getAllProducts() {
        console.log('here')
        return await this.productService.getAllProducts()
    }

    @Get('/:id_or_name')
    async getProduct(@Param('id_or_name') param: string) {
        return await this.productService.getProduct(param)
    }

    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        console.log(createProductDTO)
        return await this.productService.createProduct(createProductDTO);
    }
}