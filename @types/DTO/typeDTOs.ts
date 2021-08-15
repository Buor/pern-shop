export interface GetTypesDTO {
    id: number,
    name: string,
    typeLogo: string | null
}

export interface GetTypeDTO extends GetTypesDTO {
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

