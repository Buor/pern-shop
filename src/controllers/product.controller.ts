import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ProductService } from '../services/product.service'
import { CreateProductDTO } from '../dto/productDTOs'
import { ProductDTO } from '../../@types/DTO/productDTOs'

@Controller('/product')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Get('/all/type/:typeId/count')
    async getAllProductsCountByType(@Param('typeId') typeId: string,
                                    @Query('filters') filters: string[]): Promise<number> {
        return await this.productService.getAllProductsCountByType(+typeId, filters)
    }

    @Get('/all/type/:typeId/page/:pageNumber')
    async getProductsByType(@Param('typeId') typeId: string,
                            @Param('pageNumber') pageNumber: number,
                            @Query('pageSize') pageSize: number | undefined,
                            @Query('filters') filters: string[] | undefined,
                            @Query('order') order: "ASC" | "DESC" | undefined
                            ): Promise<ProductDTO[]> {
        return await this.productService.getProductsByType(+typeId, +pageNumber, filters, pageSize, order)
    }

    @Get('/all')
    async getAllProducts() {
        return await this.productService.getAllProducts()
    }

    @Get('/:id/count')
    async getProductCount(@Param('id') id: string): Promise<number> {
        return await this.productService.getProductCount(+id)
    }

    @Get('/:id')
    async getProduct(@Param('id') id: string,
                     @Query('withTypePropValues') withTypePropValues?: "true",
                     @Query('withTypeProperties') withTypeProperties?: "true",
                     @Query('withType') withType?: "true"): Promise<ProductDTO> {
        return await this.productService.getProduct(+id, {
            withTypePropValues,
            withTypeProperties,
            withType
        })
    }

    @Post()
    async createProduct(@Body() createProductDTO: CreateProductDTO) {
        return await this.productService.createProduct(createProductDTO)
    }
}