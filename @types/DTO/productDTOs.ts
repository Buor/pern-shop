export class GetAllProductsDTO {
    name: string
    cost: number
    count: number
    discountCost: number
    img: string | null
    id: number
}

export class CategoryProductDTO extends GetAllProductsDTO {
    typePropertyValues: { id: number, name: string }[]
}