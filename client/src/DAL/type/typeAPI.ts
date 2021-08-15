import axiosInstance from '../axiosInstance'
import { GetTypeDTO, GetTypesDTO } from '../../../../@types/DTO/typeDTOs'

export const reqGetType = (typeNameOrId: string) => axiosInstance.get(`/type/${typeNameOrId}`)
export const reqGetTypes = () => axiosInstance.get(`/type/all`)

export const getType = async (typeNameOrId: string) : Promise<GetTypeDTO> => {
    return (await reqGetType(typeNameOrId)).data
}

export const getTypes = async (): Promise<GetTypesDTO[]> => {
    return (await reqGetTypes()).data;
}