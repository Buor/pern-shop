import { IsString } from 'class-validator'

export class AddProductToBasketDTO {
    @IsString()
    productId: string
}