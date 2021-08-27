import { Body, Controller, Param, Put } from '@nestjs/common'
import { BasketService } from '../Services/basket.service'
import { AddProductToBasketDTO } from '../../@types/DTO/basketDTOs'

@Controller('/basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) {
    }

    @Put()
    async addProductToBasket(@Body() reqBody: AddProductToBasketDTO) {
        return await this.basketService.addProductToBasket(reqBody)
    }
}