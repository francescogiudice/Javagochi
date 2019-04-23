import * as actionTypes from './actionTypes';
import axios from 'axios';

export const requestOwnedJcs = () => {
    return {
        type: actionTypes.REQUEST_OWNED_JCS
    }
}

// TODO: consider adding a received at parameter
export const receiveOwnedJcs = (javagochis) => {
    return {
        type: actionTypes.RECEIVED_OWNED_JCS,
        payload: {
            ownedJcs: javagochis
        }
    }
}

export const failJcRaces = (err) => {
    return {
        type: actionTypes.JC_OWNED_FAILED,
        error: err
    }
}

export const getOwnedJcs = () => {
    return dispatch => {
        dispatch(requestOwnedJcs());

        const token = localStorage.getItem('token');
        const user = localStorage.getItem('username');

        if(token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
        else {
            axios.defaults.headers = {
                "Content-Type": "application/json"
            }
        }
        axios.get(`http://localhost:8000/api/users/${user}/javagochis/`)
        .then(res => {
            const javagochis = res.data;
            dispatch(receiveOwnedJcs(javagochis));
        })
        .catch(err => {
            dispatch(failJcRaces(err))
        })
    }
}
