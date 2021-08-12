import { HttpException, Injectable } from '@nestjs/common'
import Type from '../Entities/Type'
import { CreateTypeDTO } from '../DTO/createTypeDTO'
import { TypeEntry } from '../Entities/TypeEntry'

@Injectable()
export class TypeService {
    async createType(createTypeDTO: CreateTypeDTO) {

        //Check if this type already exists
        const type = await Type.findOne({where: {name: createTypeDTO.name}})
        if(type) {
            console.log(type)
            throw new HttpException(`Type with name ${createTypeDTO.name} already exists!`, 400)
        }

        //Deal with typeData
        let typeEntries: TypeEntry[] = []
        try {
            typeEntries = await Promise.all(createTypeDTO.typeEntries.map(entry => {
                return TypeEntry.create({
                    name: entry.name.toLowerCase(),
                    values: entry.values.map(value => value.toLowerCase())
                }).save()
            }))
        } catch (e) {
            console.log(e.message)
            throw new HttpException(e.message, 400)
        }

        //Create Type
        return await Type.create({
            name: createTypeDTO.name.toLowerCase(),
            typeLogo: createTypeDTO.typeLogo,
            typeEntries
        }).save()
    }
}