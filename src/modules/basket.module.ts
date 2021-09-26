import { Module } from '@nestjs/common'
import { BasketService } from '../services/basket.service'
import { BasketController } from '../controllers/basket.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import Product from '../entities/Product'
import Basket from '../entities/Basket'

@Module({
    providers: [BasketService],
    controllers: [BasketController],
    imports: [TypeOrmModule.forFeature([Product, Basket])]
})
export class BasketModule {
}