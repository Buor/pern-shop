import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { TypeService } from '../services/type.service'
import { CreateTypeDTO, UpdateTypeDTO } from '../dto/typeDTOs'

@Controller('/type')
export class TypeController {

    constructor(private readonly typeService: TypeService) {}

    @Get('/all')
    async getTypes() {
        return await this.typeService.getTypes()
    }

    @Get(':idOrName')
    async getType(@Param('idOrName') idOrName: string) {
        return await this.typeService.getType(idOrName)
    }

    @Patch(':id')
    async updateType(@Body() updateTypeDTO: UpdateTypeDTO, @Param('id') id: string) {
        return await this.typeService.updateType(updateTypeDTO, +id)
    }

    @Post()
    async createType(@Body() createTypeDTO: CreateTypeDTO) {
        return await this.typeService.createType(createTypeDTO)
    }
}