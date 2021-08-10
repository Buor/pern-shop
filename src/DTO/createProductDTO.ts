import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductDTO {
    @IsString()
    name: string

    @IsNumber()
    cost: number

    @IsOptional()
    @IsNumber()
    discountCost: number

    @IsOptional()
    @IsString()
    img: string

    @IsArray({ each: true })
    productsInfo: Array<[string, string]>

    @IsString()
    brand

    @IsString()
    type

}