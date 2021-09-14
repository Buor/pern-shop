import { ECategoryActionType, ICategoryPageState, TCategoryPageAction } from './types'

const initialState: ICategoryPageState = {
    filters: []
}

export const categoryPageReducer = (state = initialState, action: TCategoryPageAction): ICategoryPageState => {
    switch (action.type) {
        case ECategoryActionType.ADD_FILTER: {
            return {...state, filters: [...state.filters, action.filterId]}
        }
        case ECategoryActionType.REMOVE_FILTER: {
            return {...state, filters: state.filters.filter(id => id !== action.filterId)}
        }
        default: {
            return state
        }
    }
}