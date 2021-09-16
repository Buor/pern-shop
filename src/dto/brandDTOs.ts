import { IsOptional, IsString } from 'class-validator'

export class CreateBrandDTO {

    @IsString()
    brand: string

    @IsOptional()
    @IsString()
    brandLogo: string

}