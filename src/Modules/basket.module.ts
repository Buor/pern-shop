import { Module } from '@nestjs/common'
import { BasketService } from '../Services/basket.service'
import { BasketController } from '../Controllers/basket.controller'

@Module({
    providers: [BasketService],
    controllers: [BasketController]
})
export class BasketModule {
}