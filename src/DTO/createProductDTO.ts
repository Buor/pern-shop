import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

type TProductInfo = [string, string]

class ProductInfo {
    @IsString()
    name: string

    @IsString()
    description: string
}

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

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ProductInfo)
    productsInfo: Array<TProductInfo>

    @IsString()
    brand

    @IsString()
    type

}