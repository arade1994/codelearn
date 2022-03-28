import { FETCH_TUTORIALS, UPDATE_TUTORIALS } from '../actions/actionTypes'

const initialState = {
    tutorials: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TUTORIALS: {
            return {
                ...state,
                tutorials: action.tutorials
            }
        }
        case UPDATE_TUTORIALS: {
            return {
                ...state,
                tutorials: action.tutorials
            }
        }
        default:
            return state
    }
}

export default reducer