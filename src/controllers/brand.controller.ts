import { Body, Controller, Post } from '@nestjs/common'
import { BrandService } from '../services/brand.service'
import { CreateBrandDTO } from '../dto/brandDTOs'

@Controller('/brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {
    }

    @Post()
    async createBrand(@Body() createBrandDTO: CreateBrandDTO) {
        return await this.brandService.createBrand(createBrandDTO)
    }
}