import { IsJSON, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateTypeDTO {

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    typeLogo: string

    @IsObject({each: true})
    typeEntries: Array<{name: string, values: string[]}>

}