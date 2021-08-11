import { Body, Controller, Post } from '@nestjs/common'
import { TypeService } from '../Services/type.service'
import { CreateTypeDTO } from '../DTO/createTypeDTO'

@Controller('/type')
export class TypeController {

    constructor(private readonly typeService: TypeService) {}

    @Post()
    async createType(@Body() createTypeDTO: CreateTypeDTO) {
        return await this.typeService.createType(createTypeDTO)
    }
}