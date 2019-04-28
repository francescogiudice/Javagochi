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

export const getOwnedJcs = (user) => {
    return dispatch => {
        dispatch(requestOwnedJcs());

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
export const requestOwnedJcById = () => {
    return {
        type: actionTypes.REQUEST_OWNED_JC_BY_ID
    }
}

// TODO: consider adding a received at parameter
export const receivedOwnedJcById = (javagochi) => {
    return {
        type: actionTypes.RECEIVED_OWNED_JC_BY_ID,
        payload: {
            selectedJc: javagochi
        }
    }
}

export const getOwnedJcById = (id) => {
    return dispatch => {
        dispatch(requestOwnedJcById());

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
        axios.get(`http://localhost:8000/api/javagochi/owned/${id}/`)
        .then(res => {
            const javagochi = res.data;
            dispatch(receivedOwnedJcById(javagochi));
        })
        .catch(err => {
            dispatch(failJcRaces(err))
        })
    }
}

export const useItemStart = () => {
    return {
        type: actionTypes.USE_ITEM_START
    }
}

export const useItemEnd = () => {
    return {
        type: actionTypes.USE_ITEM_END
    }
}

export const useItemError = (err) => {
    return {
        type: actionTypes.USE_ITEM_ERROR,
        error: err
    }
}

export const useItem = (item, jcId) => {
    return dispatch => {
        dispatch(useItemStart());

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

        axios.put(`http://localhost:8000/api/javagochi/owned/${jcId}/useitem/`, {
            item: item.item.name,
            user: item.owner.username
        })
        .then(res => {
            dispatch(useItemEnd());
            dispatch(getOwnedJcById(jcId));
        })
        .catch(err => {
            dispatch(useItemError(err))
        })
    }
}
