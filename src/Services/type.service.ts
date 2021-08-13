import { HttpException, Injectable } from '@nestjs/common'
import Type from '../Entities/Type'
import { CreateTypeDTO } from '../DTO/createTypeDTO'
import { TypeProperty } from '../Entities/TypeProperty'
import { TypePropertyValue } from '../Entities/TypePropertyValue'

@Injectable()
export class TypeService {
    async createType(createTypeDTO: CreateTypeDTO) {

        //Check if this type already exists
        const type = await Type.findOne({ where: { name: createTypeDTO.name } })
        if (type) {
            console.log(type)
            throw new HttpException(`Type with name ${createTypeDTO.name} already exists!`, 400)
        }

        //Deal with typeData
        let typeProperties: TypeProperty[] = []
        try {
            typeProperties = await Promise.all(createTypeDTO.typeProperties.map(async property => {

                //Create typePropertyValues in db
                const typePropertyValues = await Promise.all(property.typePropertyValues.map(async propertyValue => {
                    return await TypePropertyValue.create({ name: propertyValue.toLowerCase() }).save()
                }))

                //Create typeProperty
                return TypeProperty.create({
                    name: property.name.toLowerCase(),
                    typePropertyValues
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
            typeProperties
        }).save()
    }
}