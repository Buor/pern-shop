export enum ECategoryActionType {
    ADD_FILTER = 'ADD_FILTER',
    REMOVE_FILTER = 'REMOVE_FILTER'
}

export interface ICategoryPageState {
    filters: number[]
}

export interface IAddFilter {
    filterId: number
    type: ECategoryActionType.ADD_FILTER
}

export interface IRemoveFilter {
    filterId: number
    type: ECategoryActionType.REMOVE_FILTER
}

export type TCategoryPageAction = IAddFilter | IRemoveFilter