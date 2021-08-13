import { HttpException, Injectable } from '@nestjs/common'
import { CreateProductDTO } from '../DTO/createProductDTO'
import Type from '../Entities/Type'
import Brand from '../Entities/Brand'
import ProductInfo from '../Entities/ProductInfo'
import Product from '../Entities/Product'
import { GetAllProductsDTO } from '../../@types/DTO/productDTOs'
import { TypeEntry } from '../Entities/TypeEntry'

@Injectable()
export class ProductService {

    async getProduct(value: string) {
        if (Number.isInteger(+value)) {
            return await Product.findOne(+value)
        }
        return await Product.findOne({ where: { name: value } })
    }

    async getAllProducts(): Promise<GetAllProductsDTO[]> {
        const allProducts = await Product.find()
        return allProducts.map(product => ({
            count: product.count,
            img: product.img,
            cost: product.cost,
            discountCost: product.discountCost,
            name: product.name
        }))
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
        const type = await Type.findOne({ where: { type: createProductDTO.type.toLowerCase() } })
        if (!type) {
            throw new HttpException(`Type ${createProductDTO.type} not found!`, 400)
        }

        //Check typeEntries
        const typeEntries = type.typeEntries;
        const productTypeEntries: TypeEntry[] = []
        createProductDTO.typeEntries.forEach(entry => {
            //Find type entry in entries of current type
            const typeEntry = typeEntries.find(ent => ent.name === entry.name.toLowerCase())
            if(!typeEntry) {
                throw new HttpException(`There's no entry with name ${entry.name} in ${type.name} type entries!`, 400)
            }
            //Check if value is there
            const typeEntryValue = typeEntry.values.find(value => value === entry.value)
            if(!typeEntryValue) {
                throw new HttpException(`There's no value ${entry.value} in ${typeEntry.name} type entry!`, 400)
            }
            productTypeEntries.push(typeEntry)
        })

        try {
            //Create product infos
            const productInfos = await Promise.all(createProductDTO.productInfos.map(info => ProductInfo.create({
                    name: info.name,
                    description: info.description,
                }).save(),
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
                typeEntries: productTypeEntries
            }).save()
        } catch (e) {
            throw new HttpException(e.message, 500)
        }
    }


}