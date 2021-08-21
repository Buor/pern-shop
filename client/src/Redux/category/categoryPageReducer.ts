import {Reducer} from "redux"

const ADD_FILTER = "ADD_FILTER"
const REMOVE_FILTER = "REMOVE_FILTER"

const initialState: {filters: number[]} = {
    filters: []
}

export const categoryPageReducer: Reducer<typeof initialState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_FILTER: {
            return {...state, filters: [...state.filters, action.filterId]}
        }
        case REMOVE_FILTER: {
            return {...state, filters: state.filters.filter(id => id !== action.filterId)}
        }
    }

    return state
}

export const addFilter = (filterId: number) => {
    return {filterId, type: ADD_FILTER}
}
export const removeFilter = (filterId: number) => {
    return {filterId, type: REMOVE_FILTER}
}