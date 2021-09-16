import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class TypeProperty {
    @IsString()
    name: string

    @IsString({ each: true })
    typePropertyValues: string[]
}

export class CreateTypeDTO {

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    typeLogo: string

    @IsObject({ each: true })
    typeProperties: Array<{ name: string, typePropertyValues: string[] }>

}

export class UpdateTypeDTO {

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    typeLogo: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TypeProperty)
    typeProperties: TypeProperty[]
}