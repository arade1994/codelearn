import { REGISTRATE, LOGIN } from './actionTypes';
import { apiURL } from '../../utils/Connection';

export const registrateUser = (userData) => {
    return dispatch => {
        const user = {
            firstName: userData.firstName.value,
            lastName: userData.lastName.value,
            age: userData.age.value,
            username: userData.username.value,
            city: userData.city.value,
            country: userData.country.value,
            email: userData.email.value,
            password: userData.password.value
        }
        fetch(`${apiURL}/users.json`, {
            method: 'POST',
            body: JSON.stringify(user)
        }).catch(error => {
            alert('Something went wrong, please try again');
        }).then(res => {
            return res.json();
        }).then(response => {
            dispatch({
                type: REGISTRATE,
                user: user
            })
        })
    }
}

export const loginUser = (loginData) => {
    return async (dispatch, getState) => {
        const stateData = getState()
        const usersList = stateData.users.usersList

        const user = usersList.find((usr) => {
            return usr.username === loginData.username && usr.password === loginData.password;
        })
        
        if (user) {
            dispatch({
                type: LOGIN,
                user: user
            })
        }
        else {
            alert('Incorect login data. Please try again');
            dispatch({
                type: LOGIN,
                user: null
            })
        }
    }
}
