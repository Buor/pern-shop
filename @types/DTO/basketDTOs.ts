import { IsString } from 'class-validator'

export class AddProductToBasketDTO {
    @IsString()
    userId: string

    @IsString()
    productId: string
}