import { Body, Controller, Get, Put, Req, Res } from '@nestjs/common'
import { BasketService } from '../Services/basket.service'
import { AddProductToBasketDTO } from '../../@types/DTO/basketDTOs'

@Controller('/basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) {
    }

    @Get()
    async getProductsFromUserBasket(@Req() req, @Res() res) {
        return res.json(await this.basketService.getProductsFromUserBasket(req.user.id))
    }

    @Put()
    async addProductToBasket(@Body() {productId}: AddProductToBasketDTO, @Req() req, @Res() res) {
        return res.json(await this.basketService.addProductToBasket(productId, req.user.id))
    }
}