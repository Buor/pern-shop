export interface GetTypesDTO {
    id: number,
    name: string,
    typeLogo: string | null
}

export interface GetTypeDTO extends GetTypesDTO {
    'typeProperties': ITypeProperty[],
    brands: Array<any>
}

export interface ITypeProperty {
    id: number,
    name: string,
    typePropertyValues: ITypePropertyValue[]
}

export interface ITypePropertyValue {
    id: number,
    name: string
}

