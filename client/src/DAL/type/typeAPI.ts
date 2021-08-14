import axiosInstance from '../axiosInstance'
import { GetTypeDTO } from '../../../../@types/DTO/typeDTOs'

export const getType = (typeNameOrId: string) => axiosInstance.get(`/type/${typeNameOrId}`)

export const getTypeData = async (typeNameOrId: string) : Promise<GetTypeDTO> => {
    return (await getType(typeNameOrId)).data
}