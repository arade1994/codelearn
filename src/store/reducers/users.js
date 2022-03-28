import { FETCH_USERS } from '../actions/actionTypes'

const initialState = {
    usersList: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS: {
            return {
                ...state,
                usersList: action.usersList
            }
        }
        default: {
            return state
        }
    }
}

export default reducer