import { Module } from '@nestjs/common'
import { BrandController } from '../controllers/brand.controller'
import { BrandService } from '../services/brand.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import Brand from '../entities/Brand'

@Module({
    controllers: [BrandController],
    providers: [BrandService],
    imports: [TypeOrmModule.forFeature([Brand])]
})
export class BrandModule {

}