import { Injectable } from '@nestjs/common'
import Type from '../Entities/Type'
import { CreateTypeDTO } from '../DTO/createTypeDTO'

@Injectable()
export class TypeService {
    async createType(createTypeDTO: CreateTypeDTO) {
        return await Type.create({
            type: createTypeDTO.type.toLowerCase(),
            typeLogo: createTypeDTO.typeLogo
        }).save()
    }
}