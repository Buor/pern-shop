import { Injectable } from '@nestjs/common'
import Brand from '../Entities/Brand'
import { CreateBrandDTO } from '../DTO/brandDTOs'

@Injectable()
export class BrandService {
    async createBrand(createBrandDTO: CreateBrandDTO) {
        return await Brand.create({
            brand: createBrandDTO.brand.toLowerCase(),
            brandLogo: createBrandDTO.brandLogo
        }).save()
    }
}