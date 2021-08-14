import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { TypeService } from '../Services/type.service'
import { CreateTypeDTO } from '../DTO/createTypeDTO'

@Controller('/type')
export class TypeController {

    constructor(private readonly typeService: TypeService) {}

    @Get(':idOrName')
    async getType(@Param('idOrName') idOrName: string) {
        return await this.typeService.getType(idOrName)
    }

    @Post()
    async createType(@Body() createTypeDTO: CreateTypeDTO) {
        return await this.typeService.createType(createTypeDTO)
    }
}