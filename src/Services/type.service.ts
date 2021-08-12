import { Injectable } from '@nestjs/common'
import Type from '../Entities/Type'
import { CreateTypeDTO } from '../DTO/createTypeDTO'
import { TypeData } from '../Entities/TypeData'

@Injectable()
export class TypeService {
    async createType(createTypeDTO: CreateTypeDTO) {

        //Deal with typeData
        const typeData = await TypeData.create({
            typeDataPairs: createTypeDTO.typeData
        }).save()

        //Create Type
        return await Type.create({
            type: createTypeDTO.type.toLowerCase(),
            typeLogo: createTypeDTO.typeLogo,
            typeData: typeData
        }).save()
    }
}