import { REGISTRATE, LOGIN, FETCH_USER_DATA, UPDATE_USER_DATA } from '../actions/actionTypes';

const initialState = {
    userData: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTRATE: {
            return {
                ...state,
                userData: action.user
            }
        }
        case LOGIN: {
            return {
                ...state,
                userData: action.user
            }
        }
        case FETCH_USER_DATA: {
            return {
                ...state,
                userData: action.user
            }
        }
        case UPDATE_USER_DATA: {
            const updatedUserData = {...state.userData}
            updatedUserData.tutorials = action.tutorials
            return {
                ...state,
                userData: updatedUserData
            }
        }
        default: {
            return state
        }
    }
}

export default reducer;