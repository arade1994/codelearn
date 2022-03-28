import { FETCH_USERS, FETCH_USER_DATA, UPDATE_USER_DATA } from './actionTypes'
import { apiURL } from '../../utils/Connection'

export const fetchUsers = () => {
    return dispatch => {
        fetch(`${apiURL}/users.json`)
            .catch(error => console.log(error))
            .then(res => res.json())
            .then(response => {
                let usersList = [];
                for(let key in response) {
                    let user = response[key]
                    user.uuid = key
                    usersList.push(user)
                }
                
                dispatch({
                    type: FETCH_USERS,
                    usersList: usersList
                })
            })
    }
}

export const fetchUserData = (uuid) => {
    return dispatch => {
        fetch(`${apiURL}/users/${uuid}.json`)
            .catch(error => {
                 alert('Error fetching user data')
            })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: FETCH_USER_DATA,
                    user: response
                })
            })
    }
}

export const updateUserData = (uuid, tutorials) => {
    return dispatch => {
        fetch(`${apiURL}/users/${uuid}/tutorials.json`, {
            method: 'PUT',
            body: JSON.stringify(tutorials)
        })
            .then(res => res.json())
            .then(response => {
                dispatch({
                    type: UPDATE_USER_DATA,
                    tutorials: tutorials
                })
            })
            .catch(error => console.log(error))
    }
}