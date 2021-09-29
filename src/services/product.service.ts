import { HttpException, Injectable } from '@nestjs/common'
import Type from '../entities/Type'
import Brand from '../entities/Brand'
import ProductInfo from '../entities/ProductInfo'
import Product from '../entities/Product'
import { GetAllProductsDTO, IGetProductOptions, ProductDTO } from '../../@types/DTO/productDTOs'
import { TypeProperty } from '../entities/TypeProperty'
import { TypePropertyValue } from '../entities/TypePropertyValue'
import { CreateProductDTO } from '../dto/productDTOs'
import { Connection, FindOneOptions, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ProductService {

    constructor(private readonly connection: Connection,
                @InjectRepository(Product) private readonly productRepository: Repository<Product>,
                @InjectRepository(Product) private readonly brandRepository: Repository<Brand>) {
    }

    async getProduct(id: number, options: IGetProductOptions): Promise<ProductDTO> {

        if (options.withType === 'true') {
            return await this._getProduct(id, { relations: ['type'] })
        }
        if (options.withTypePropValues === 'true') {
            return await this._getProduct(id, { relations: ['typePropertyValues'] })
        }
        if (options.withTypeProperties === 'true') {

            let product = await this._getProduct(id, { relations: ['typePropertyValues', 'type'] })

            let productSelection = await this.connection.createQueryBuilder(Product, 'product')
                .leftJoinAndSelect('product.type', 'type')
                .leftJoinAndSelect('type.typeProperties', 'typeProperty')
                .leftJoinAndSelect('typeProperty.typePropertyValues', 'typePropertyValue')
                .where('product.id = :id', { id: product.id })
                .getOne()

            let typePropValuesIds = product.typePropertyValues.map(typePropertyValue => typePropertyValue.id)
            let filteredTypeProperties = productSelection.type.typeProperties.filter(typeProperty => typeProperty.typePropertyValues.some(typePropValue => typePropValuesIds.includes(typePropValue.id))).map(typeProperty => ({
                ...typeProperty,
                typePropertyValues: typeProperty.typePropertyValues.filter(typePropertyValue => typePropValuesIds.includes(typePropertyValue.id))
            }))

            let productDTO = { ...product } as ProductDTO
            delete productDTO.type
            delete productDTO.typePropertyValues
            productDTO.typeProperties = filteredTypeProperties

            return productDTO
        }


    }

    async getProductCount(id: number): Promise<number> {
        let product: Product = await this._getProduct(id)
        return product.count
    }

    async getAllProducts(): Promise<GetAllProductsDTO[]> {
        return await this.productRepository.find()
    }

    async getProductsByType(typeId: number, pageNumber: number, filters: string[], pageSize: number = 50, order: 'ASC' | 'DESC' = 'ASC'): Promise<any> {
        if (Number.isNaN(pageNumber) || Number.isNaN(typeId))
            throw new HttpException(`Wrong typeId or pageNumber!`, 400)

        return await this.connection.manager.query(ProductService._queryFilteredProductsForCatPage(typeId, pageSize, (pageNumber - 1) * pageSize, filters, order))
    }

    async getAllProductsCountByType(typeId: number, filters: string[]): Promise<number> {
        return (await this.connection.manager.query(ProductService._queryCountOfProductsOnCatPage(typeId, filters)))[0].count
    }

    async createProduct(createProductDTO: CreateProductDTO) {

        //Check if product with given name exists
        const product = await this.productRepository.findOne({ where: { name: createProductDTO.name } })
        if (product) {
            throw new HttpException(`Product with name ${createProductDTO.name} already exists!`, 400)
        }

        //Check if brand exists
        const brand = await this.brandRepository.findOne({ where: { brand: createProductDTO.brand.toLowerCase() } })
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

            const newProduct = this.productRepository.create({
                name: createProductDTO.name,
                cost: createProductDTO.cost,
                discountCost: createProductDTO.discountCost,
                img: createProductDTO.img,
                count: createProductDTO.count,
                brand,
                type,
                productInfos,
                typePropertyValues
            })

            await this.productRepository.save(newProduct)
            return newProduct

        } catch (e) {
            throw new HttpException(e.message, 500)
        }
    }

    private async _getProduct(id: number, options?: FindOneOptions<Product>): Promise<Product> {
        let product: Product
        if (Number.isInteger(id))
            product = await this.productRepository.findOne(+id, options)
        else
            throw new HttpException(`Id ${id} is not an integer!`, 400)

        if (!product) throw new HttpException(`Can't find product with id or name \'${id}\'!`, 400)
        return product
    }

    private static _queryFilteredProductsForCatPage(typeId: number, take: number, skip: number, filters: string[], order: 'ASC' | 'DESC') {
        return `
            SELECT DISTINCT "id", "cost", "discountCost", "img", "name", "count" from 
            product LEFT JOIN product_type_property_values_type_property_value on product.id = "productId"
            WHERE "typeId" = ${typeId} ${filters && filters.length ? 'AND (' + filters.map(filter => `"typePropertyValueId" = ${filter}`).join(' OR ') + ')' : ''}
            ORDER BY "cost" ${order}
            LIMIT ${take} OFFSET ${skip} `
    }

    private static _queryCountOfProductsOnCatPage(typeId: number, filters: string[]) {
        return `
            SELECT COUNT(*) FROM
                (SELECT DISTINCT "id" from 
                product LEFT JOIN product_type_property_values_type_property_value on product.id = "productId"
                WHERE "typeId" = ${typeId} ${filters && filters.length ? 'AND (' + filters.map(filter => `"typePropertyValueId" = ${filter}`).join(' OR ') + ')' : ''
                }) d`
    }
}