export interface GetTypeDTO {
    'id': number,
    'name': string,
    'typeLogo': string | null,
    'typeProperties': Array<{
        id: number,
        name: string,
        typePropertyValues: Array<ITypeProperty[]>
    }>,
    brands: Array<any>
}

export interface ITypeProperty {
    id: number,
    name: string
}