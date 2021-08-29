export class ProductDTO {
    name: string
    cost: number
    count: number
    discountCost: number | null
    img: string | null
    id: number
}

export class GetAllProductsDTO extends ProductDTO {
}

export class CategoryProductDTO extends GetAllProductsDTO {
    typePropertyValues: { id: number, name: string }[]
}