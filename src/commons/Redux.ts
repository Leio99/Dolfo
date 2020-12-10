import { combineReducers, createStore } from "redux"

export const setStudenti = (studenti: any) => ({
    type: "SET_STUDENTI",
    studenti
})

export const switchAction = (state = {}, action: any) => {
    switch (action.type) {
        case "SET_STUDENTI":
            return { ...state, studenti: action.studenti }
        default:
            return state
    }
}

export const reducers = combineReducers({
    switchAction
})

export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState)
    return store
}

export const store = configureStore()