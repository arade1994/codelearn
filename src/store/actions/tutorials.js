import { FETCH_TUTORIALS, UPDATE_TUTORIALS } from './actionTypes'
import { apiURL } from '../../utils/Connection'

export const fetchTutorials = () => {
    return dispatch => {
        fetch(`${apiURL}/tutorials.json`)
            .catch(error => console.log(error))
            .then(res => res.json())
            .then(response => {
                let tutorials = [];
                for(let key in response) {
                    const tutorial = response[key]
                    tutorial.uid = key
                    tutorials.push(tutorial)
                }
                
                dispatch({
                    type: FETCH_TUTORIALS,
                    tutorials: tutorials
                })
            })
    }
}

export const updateTutorials = (tutorialsData) => {
    return dispatch => {
        fetch(`${apiURL}/tutorials.json`, {
            method: 'PUT',
            body: JSON.stringify(tutorialsData)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                dispatch({
                    type: UPDATE_TUTORIALS,
                    tutorials: tutorialsData
                })
            })
            .catch(error => console.log(error))
    }
}