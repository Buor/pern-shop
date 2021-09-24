interface IType {
    id: number,
    name: string,
    typeLogo: string,
    typeProperties: ITypeProperty[]
}

interface ITypeProperty {
    id: number
    name: string
    typePropertyValues: ITypePropertyValue[]
}

interface ITypePropertyValue {
    id: number,
    name: string
}

export interface IGetProductOptions {
    withType?: 'true'
    withTypeProperties?: 'true'
    withTypePropValues?: 'true'
}

export class ProductDTO {
    name: string
    cost: number
    count: number
    discountCost: number | null
    img: string | null
    id: number
    type?: IType
    typeProperties?: ITypeProperty[]
    typePropertyValues?: ITypePropertyValue[]
}

export class GetAllProductsDTO extends ProductDTO {
}