import { HttpException, Injectable } from '@nestjs/common'
import Type from '../entities/Type'
import { TypeProperty } from '../entities/TypeProperty'
import { TypePropertyValue } from '../entities/TypePropertyValue'
import { GetTypesDTO } from '../../@types/DTO/typeDTOs'
import { Repository } from 'typeorm'
import { CreateTypeDTO, UpdateTypeDTO } from '../dto/typeDTOs'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TypeService {

    constructor(@InjectRepository(Type) private readonly typeRepository: Repository<Type>,
                @InjectRepository(TypeProperty) private readonly typePropertyRepository: Repository<TypeProperty>) {
    }

    async getType(value: number | string) {
        let type: Type;

        if (Number.isInteger(+value))
            type = await this.typeRepository.findOne(value)
        else
            type = await this.typeRepository.findOne({ where: { name: value } })

        if(!type) throw new HttpException(`Type with id or name ${value} not found!`,400)
        return type
    }

    async getTypes(): Promise<GetTypesDTO[]> {
        const types = await this.typeRepository.find()
        return types.map(type => ({
            name: type.name,
            typeLogo: type.typeLogo,
            id: type.id
        }))
    }

    async createType(createTypeDTO: CreateTypeDTO) {

        //Check if this type already exists
        const type = await this.typeRepository.findOne({ where: { name: createTypeDTO.name.toLowerCase() } })
        if (type) {
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
                const newTypeProperty = await this.typePropertyRepository.create({
                    name: property.name.toLowerCase(),
                    typePropertyValues
                })
                return await this.typePropertyRepository.save(newTypeProperty)
            }))
        } catch (err) {
            console.log(err.message)
            throw new HttpException(err.message, 400)
        }

        //Create Type
        const newType = this.typeRepository.create({
            name: createTypeDTO.name.toLowerCase(),
            typeLogo: createTypeDTO.typeLogo,
            typeProperties
        })

        return await this.typeRepository.save(newType)
    }

    async updateType(updateTypeDTO: UpdateTypeDTO, id: number) {
        if (!Number.isInteger(id)) {
            throw new HttpException(`ID ${id} is not valid!`, 400)
        }

        let type = await this.typeRepository.findOne(id, {relations: ['typeProperties', 'typeProperties.typePropertyValues']})

        if (!type) {
            throw new HttpException(`Cannot find type with id ${id}!`, 400)
        }

        type.name = updateTypeDTO.name || type.name.toLowerCase()
        type.typeLogo = updateTypeDTO.typeLogo || type.typeLogo

        //Deal with type properties
        if (updateTypeDTO.typeProperties) {
            for (let typeProp of updateTypeDTO.typeProperties) {
                //Find type Prop
                let typePropertyIdx = type.typeProperties.findIndex(typeProperty => typeProperty.name === typeProp.name.toLowerCase())
                let typeProperty: TypeProperty;

                if (typePropertyIdx !== -1) {
                    typeProperty = type.typeProperties[typePropertyIdx]
                    type.typeProperties.splice(typePropertyIdx, 1)
                } else {
                    typeProperty = this.typePropertyRepository.create({
                        name: typeProp.name.toLowerCase(),
                        typePropertyValues: []
                    })
                }

                for (let typeValue of typeProp.typePropertyValues) {
                    typeProperty.typePropertyValues.push(await TypePropertyValue.create({ name: typeValue.toLowerCase() }).save())
                }

                type.typeProperties.push(await this.typePropertyRepository.save(typeProperty))
            }
        }

        return await this.typeRepository.save(type)
    }
}