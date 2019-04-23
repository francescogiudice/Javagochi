import * as actionTypes from './actionTypes';
import axios from 'axios';

export const requestJcRaces = () => {
    return {
        type: actionTypes.REQUEST_JC_RACES
    }
}

// TODO: consider adding a received at parameter
export const receiveJcRaces = (javagochis) => {
    return {
        type: actionTypes.RECEIVED_JC_RACES,
        payload: {
            jcRaces: javagochis
        }
    }
}

export const failJcRaces = (err) => {
    return {
        type: actionTypes.JC_RACES_FAILED,
        error: err
    }
}

export const getJcRaces = () => {
    return dispatch => {
        dispatch(requestJcRaces());

        const token = localStorage.getItem('token');

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
        axios.get('http://localhost:8000/api/javagochi/market/')
        .then(res => {
            const javagochis = res.data;
            dispatch(receiveJcRaces(javagochis));
        })
        .catch(err => {
            dispatch(failJcRaces(err))
        })
    }
}
