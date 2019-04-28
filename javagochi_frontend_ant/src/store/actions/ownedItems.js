import * as actionTypes from './actionTypes';
import axios from 'axios';

export const requestUserItems = () => {
    return {
        type: actionTypes.REQUEST_USER_ITEMS
    }
}

export const requestUserItemDetail = () => {
    return {
        type: actionTypes.REQUEST_USER_ITEM_DETAIL
    }
}

// TODO: consider adding a received at parameter
export const receiveUserItems = (items) => {
    return {
        type: actionTypes.RECEIVED_USER_ITEMS,
        payload: {
            ownedItems: items
        }
    }
}

// TODO: consider adding a received at parameter
export const receiveUserItemDetail = (item) => {
    return {
        type: actionTypes.RECEIVED_USER_ITEM_DETAIL,
        payload: {
            selectedOwnedItem: item
        }
    }
}

export const itemsFailed = (err) => {
    return {
        type: actionTypes.OWNED_ITEMS_FAIL,
        error: err
    }
}

export const itemDetailFailed = (err) => {
    return {
        type: actionTypes.OWNED_ITEM_DETAIL_FAIL,
        error: err
    }
}

export const getUserItems = (user) => {
    return dispatch => {
        dispatch(requestUserItems());

        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }

        axios.get(`http://localhost:8000/api/users/${user}/items/`)
        .then(res => {
            const items = res.data;
            dispatch(receiveUserItems(items));
        })
        .catch(err => {
            dispatch(itemsFailed(err))
        })
    }
}

export const getUserItemDetail = (id) => {
    return dispatch => {
        dispatch(requestUserItemDetail());

        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://localhost:8000/api/items/owned/${id}/`)
        .then((res) => {
            const item = res.data;
            dispatch(receiveUserItemDetail(item));
        })
        .catch(err => {
            dispatch(itemDetailFailed(err))
        });
    }
}
