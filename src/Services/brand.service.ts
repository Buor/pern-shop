import { Injectable } from '@nestjs/common'
import { CreateBrandDTO } from '../DTO/createBrandDTO'
import Brand from '../Entities/Brand'

@Injectable()
export class BrandService {
    async createBrand(createBrandDTO: CreateBrandDTO) {
        return await Brand.create({
            brand: createBrandDTO.brand.toLowerCase(),
            brandLogo: createBrandDTO.brandLogo
        }).save()
    }
}