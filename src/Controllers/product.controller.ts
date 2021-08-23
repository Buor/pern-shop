import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProductService } from '../Services/product.service'
import { CreateProductDTO } from '../DTO/productDTOs'
import { CategoryProductDTO } from '../../@types/DTO/productDTOs'

@Controller('/product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('/all/type/:typeId')
    async getAllProductsByType(@Param('typeId') typeId: string): Promise<CategoryProductDTO[]> {
        return await this.productService.getAllProductsByType(+typeId)
    }

    @Get('/all')
    async getAllProducts() {
        return await this.productService.getAllProducts()
    }

    @Get('/:id_or_name')
    async getProduct(@Param('id_or_name') param: string) {
        return await this.productService.getProduct(param)
    }

    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        return await this.productService.createProduct(createProductDTO);
    }
}