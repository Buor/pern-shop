import { IsOptional, IsString } from 'class-validator'

export class CreateTypeDTO {

    @IsString()
    type: string

    @IsOptional()
    @IsString()
    typeLogo: string

}