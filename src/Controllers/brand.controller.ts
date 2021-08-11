import { Body, Controller, Post } from '@nestjs/common'
import { BrandService } from '../Services/brand.service'
import { CreateBrandDTO } from '../DTO/createBrandDTO'

@Controller('/brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {
    }

    @Post()
    async createBrand(@Body() createBrandDTO: CreateBrandDTO) {
        return await this.brandService.createBrand(createBrandDTO)
    }
}