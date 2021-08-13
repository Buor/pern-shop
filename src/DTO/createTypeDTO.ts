import { IsObject, IsOptional, IsString } from 'class-validator'

export class CreateTypeDTO {

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    typeLogo: string

    @IsObject({each: true})
    typeProperties: Array<{name: string, typePropertyValues: string[]}>

}