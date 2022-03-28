import { createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import tutorialsReducer from './reducers/tutorials'
import authReducer from './reducers/auth'
import usersReducer from './reducers/users'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(combineReducers({
        tutorials: tutorialsReducer,
        auth: authReducer,
        users: usersReducer
    }), composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore;