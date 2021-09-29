import { Injectable } from '@nestjs/common'
import Brand from '../entities/Brand'
import { CreateBrandDTO } from '../dto/brandDTOs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class BrandService {

    constructor(@InjectRepository(Brand) private readonly brandRepository: Repository<Brand>) {
    }

    async createBrand(createBrandDTO: CreateBrandDTO) {
        const brand = await this.brandRepository.create({
            brand: createBrandDTO.brand.toLowerCase(),
            brandLogo: createBrandDTO.brandLogo
        })

        return await this.brandRepository.save(brand)
    }
}