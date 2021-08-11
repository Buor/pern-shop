import { Module } from '@nestjs/common'
import { BrandController } from '../Controllers/brand.controller'
import { BrandService } from '../Services/brand.service'

@Module({
    controllers: [BrandController],
    providers: [BrandService]
})
export class BrandModule {

}