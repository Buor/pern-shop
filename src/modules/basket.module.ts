import { Module } from '@nestjs/common'
import { BasketService } from '../services/basket.service'
import { BasketController } from '../controllers/basket.controller'

@Module({
    providers: [BasketService],
    controllers: [BasketController]
})
export class BasketModule {
}