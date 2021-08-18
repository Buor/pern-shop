import { HttpException, Injectable } from '@nestjs/common'
import Type from '../Entities/Type'
import { CreateTypeDTO } from '../DTO/createTypeDTO'
import { TypeProperty } from '../Entities/TypeProperty'
import { TypePropertyValue } from '../Entities/TypePropertyValue'
import { GetTypesDTO } from '../../@types/DTO/typeDTOs'
import { Connection } from 'typeorm'

@Injectable()
export class TypeService {

    constructor(private readonly connection: Connection) {
    }

    async getType(value: number | string) {
        if(Number.isInteger(+value))
            return await Type.findOne(value)
        return await Type.findOne({where: {name: value}})
    }

    async getTypes(): Promise<GetTypesDTO[]> {
        const types = await Type.find();
        return types.map(type => ({
            name: type.name,
            typeLogo: type.typeLogo,
            id: type.id
        }))
    }

    async createType(createTypeDTO: CreateTypeDTO) {

        //Check if this type already exists
        const type = await Type.findOne({ where: { name: createTypeDTO.name.toLowerCase() } })
        console.log(type)
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
                return await  TypeProperty.create({
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

    async deleteTypes() {
        try {
            await this.connection.createQueryBuilder().delete().from(TypePropertyValue).execute()
            await this.connection.createQueryBuilder().delete().from(TypeProperty).execute()
            await this.connection.createQueryBuilder().delete().from(Type).execute()
        } catch(e) {
            console.log(e)
        }
    }
}