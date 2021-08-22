import { HttpException, Injectable } from '@nestjs/common'
import Type from '../Entities/Type'
import Brand from '../Entities/Brand'
import ProductInfo from '../Entities/ProductInfo'
import Product from '../Entities/Product'
import { CategoryProductDTO, GetAllProductsDTO } from '../../@types/DTO/productDTOs'
import { TypeProperty } from '../Entities/TypeProperty'
import { TypePropertyValue } from '../Entities/TypePropertyValue'
import { CreateProductDTO } from '../DTO/productDTOs'

@Injectable()
export class ProductService {

    async getProduct(value: string) {
        let product: Product
        if (Number.isInteger(+value))
            product = await Product.findOne(+value)
        else
            product = await Product.findOne({ where: { name: value } })

        if (!product) throw new HttpException(`Can't find product with id or name \'${value}\'!`, 400)
    }

    async getAllProducts(): Promise<GetAllProductsDTO[]> {
        const allProducts = await Product.find()
        return allProducts.map(product => ({
            count: product.count,
            img: product.img,
            cost: product.cost,
            discountCost: product.discountCost,
            name: product.name,
            id: product.id
        }))
    }

    async getAllProductsByType(typeId: number): Promise<CategoryProductDTO[]> {
        const products = await Product.find({ where: { type: typeId } })
        return products.map(product => {
                let { name, cost, discountCost, img, count, typePropertyValues, id } = product
                return { name, cost, discountCost, img, count, typePropertyValues, id }
            }
        )
    }

    async createProduct(createProductDTO: CreateProductDTO) {

        //Check if product with given name exists
        const product = await Product.findOne({ where: { name: createProductDTO.name } })
        if (product) {
            throw new HttpException(`Product with name ${createProductDTO.name} already exists!`, 400)
        }

        //Check if brand exists
        const brand = await Brand.findOne({ where: { brand: createProductDTO.brand.toLowerCase() } })
        if (!brand) {
            throw new HttpException(`Brand ${createProductDTO.brand} not found!`, 400)
        }

        //Check if type exists
        const type = await Type.findOne({ where: { name: createProductDTO.type.toLowerCase() } })
        if (!type) {
            throw new HttpException(`Type ${createProductDTO.type} not found!`, 400)
        }

        //Check if typePropertyValues correct
        const typeProperties = type.typeProperties
        const typePropertyValues: TypePropertyValue[] = []

        for (let i = 0; i < createProductDTO.typeProperties.length; ++i) {
            let property = createProductDTO.typeProperties[i]

            //Check if typeProperty exists
            const prop = typeProperties.find(prop => prop.name === property.name.toLowerCase())
            if (!prop) {
                throw new HttpException(`There is no '${property.name}' type property on '${type.name}' type! Maybe you were looking for ${typeProperties.map(prop => '\'' + prop.name + '\'').slice(0, 6).join(',')}?`, 400)
            }

            const typeProperty = await TypeProperty.findOne(prop.id)

            //Check if typePropertyValue exists on typeProperty
            const typePropertyValue = typeProperty.typePropertyValues.find(typePropertyValue => typePropertyValue.name === property.value.toLowerCase())
            if (!typePropertyValue) {
                throw new HttpException(`There is no '${property.value}' property value on '${typeProperty.name}' typeProperty!`, 400)
            }

            typePropertyValues.push(typePropertyValue)
        }

        try {
            //Create product infos
            const productInfos = await Promise.all(createProductDTO.productInfos.map(info => ProductInfo.create({
                    name: info.name,
                    description: info.description
                }).save()
            ))

            return await Product.create({
                name: createProductDTO.name,
                cost: createProductDTO.cost,
                discountCost: createProductDTO.discountCost,
                img: createProductDTO.img,
                count: createProductDTO.count,
                brand,
                type,
                productInfos,
                typePropertyValues
            }).save()
        } catch (e) {
            throw new HttpException(e.message, 500)
        }
    }


}