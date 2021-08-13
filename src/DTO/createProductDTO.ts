import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class ProductInfo {
    @IsString()
    name: string

    @IsString()
    description: string
}

class TypeProperty {
    @IsString()
    name: string

    @IsString()
    value: string
}

export class CreateProductDTO {
    @IsString()
    name: string

    @IsNumber()
    cost: number

    @IsNumber()
    count: number

    @IsOptional()
    @IsNumber()
    discountCost: number

    @IsOptional()
    @IsString()
    img: string

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ProductInfo)
    productInfos: Array<ProductInfo>

    @IsString()
    brand: string

    @IsString()
    type: string

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => TypeProperty)
    typeProperties: Array<TypeProperty>
}