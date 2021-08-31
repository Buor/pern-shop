import { IsNumber } from 'class-validator'

export class AddProductToBasketDTO {
    @IsNumber()
    productId: number
}