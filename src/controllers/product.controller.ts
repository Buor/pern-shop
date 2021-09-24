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

    @Get('/:id_or_name/count')
    async getProductCount(@Param('id_or_name') idOrName: string): Promise<number> {
        return await this.productService.getProductCount(idOrName)
    }

    @Get('/:id_or_name')
    async getProduct(@Param('id_or_name') param: string,
                     @Query('withTypePropValues') withTypePropValues?: "true",
                     @Query('withTypeProperties') withTypeProperties?: "true",
                     @Query('withType') withType?: "true"): Promise<ProductDTO> {
        return await this.productService.getProduct(param, {
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