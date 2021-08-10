import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Product from '../Entities/Product'
import { Repository } from 'typeorm'
import { CreateProductDTO } from '../DTO/createProductDTO'

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) productRepo: Repository<Product>) {}

    async createProduct(createProductDTO: CreateProductDTO) {
        return {}
    }
}