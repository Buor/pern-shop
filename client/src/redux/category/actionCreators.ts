import { ECategoryActionType } from './types'

export const CategoryPageActionCreators = {
    addFilter: (filterId: number) =>  ({filterId, type: ECategoryActionType.ADD_FILTER}),
    removeFilter: (filterId: number) =>  ({filterId, type: ECategoryActionType.REMOVE_FILTER})
}