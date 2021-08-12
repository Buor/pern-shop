import { IsJSON, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateTypeDTO {

    @IsString()
    type: string

    @IsOptional()
    @IsString()
    typeLogo: string

    @IsObject({each: true})
    typeData: object[]

}