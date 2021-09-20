export class ProductDTO {
    name: string
    cost: number
    count: number
    discountCost: number | null
    img: string | null
    id: number
    typePropertyValues?: { id: number, name: string }[]
}

export class GetAllProductsDTO extends ProductDTO {
}