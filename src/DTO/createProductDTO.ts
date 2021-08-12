import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class ProductInfo {
    @IsString()
    name: string

    @IsString()
    description: string
}

class TypeEntry {
    @IsString()
    name: string

    @IsString({each: true})
    values: string[]
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
    @Type(() => TypeEntry)
    typeEntries: Array<TypeEntry>
}