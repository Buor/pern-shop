import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ProductService } from '../Services/product.service'
import { CreateProductDTO } from '../DTO/productDTOs'
import { CategoryProductDTO, ProductDTO } from '../../@types/DTO/productDTOs'

@Controller('/product')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Get('/all/type/:typeId/count')
    async getAllProductsCountByType(@Param('typeId') typeId: string): Promise<number> {
        return await this.productService.getAllProductsCountByType(+typeId)
    }

    @Get('/all/type/:typeId/page/:pageNumber')
    async getProductsByType(@Param('typeId') typeId: string,
                            @Param('pageNumber') pageNumber: number,
                            @Query('pageSize') pageSize: number | undefined): Promise<CategoryProductDTO[]> {
        return await this.productService.getProductsByType(+typeId, +pageNumber, pageSize)
    }

    @Get('/all')
    async getAllProducts() {
        return await this.productService.getAllProducts()
    }

    @Get('/:id_or_name/count')
    async getProductCount(@Param('id_or_name') idOrName: string): Promise<number> {
        return await this.productService.getProductCount(idOrName)
    }

    @Get('/:id_or_name')
    async getProduct(@Param('id_or_name') param: string): Promise<ProductDTO> {
        return await this.productService.getProduct(param)
    }

    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        return await this.productService.createProduct(createProductDTO)
    }
}