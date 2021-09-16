import axiosInstance from '../axiosInstance'
import { GetTypeDTO, GetTypesDTO } from '../../../../@types/DTO/typeDTOs'
import { AxiosResponse } from 'axios'

export class TypeAPI {
    static async getType(typeNameOrId: string): Promise<GetTypeDTO> {
        return (await TypeAPI.reqGetType(typeNameOrId)).data
    }

    static async getTypes (): Promise<GetTypesDTO[]> {
        return (await TypeAPI.reqGetTypes()).data
    }

    private static reqGetType(typeNameOrId: string): Promise<AxiosResponse<GetTypeDTO>> {
        return axiosInstance.get(`/type/${typeNameOrId}`)
    }

    private static reqGetTypes(): Promise<AxiosResponse<GetTypeDTO[]>> {
        return axiosInstance.get(`/type/all`)
    }
}