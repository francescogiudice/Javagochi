import * as actionTypes from './actionTypes';
import axios from 'axios';

export const requestItems = () => {
    return {
        type: actionTypes.REQUEST_ITEMS
    }
}

export const requestItemDetail = () => {
    return {
        type: actionTypes.REQUEST_ITEM_DETAIL
    }
}

export const itemBuyStart = () => {
    return {
        type: actionTypes.ITEM_BUY_START
    }
}

// TODO: consider adding a received at parameter
export const receiveItems = (items) => {
    return {
        type: actionTypes.RECEIVED_JC_RACES,
        payload: {
            items: items
        }
    }
}

// TODO: consider adding a received at parameter
export const receiveItemDetail = (item) => {
    return {
        type: actionTypes.RECEIVED_ITEM_DETAIL,
        payload: {
            selectedItem: item
        }
    }
}

export const itemBuyEnd = (res) => {
    return {
        type: actionTypes.ITEM_BUY_END,
        message: res
    }
}

export const itemsFailed = (err) => {
    return {
        type: actionTypes.ITEMS_FAILED,
        error: err
    }
}

export const itemDetailFailed = (err) => {
    return {
        type: actionTypes.ITEM_DETAIL_FAILED,
        error: err
    }
}

export const itemBuyFail = (err) => {
    return {
        type: actionTypes.ITEM_BUY_FAIL,
        error: err
    }
}

export const getItems = () => {
    return dispatch => {
        dispatch(requestItems());
        axios.get('http://localhost:8000/api/items/market')
        .then(res => {
            const items = res.data;
            dispatch(receiveItems(items));
        })
        .catch(err => {
            dispatch(itemsFailed(err))
        })
    }
}

export const getItemDetail = (name) => {
    return dispatch => {
        dispatch(requestItemDetail());
        axios.get(`http://localhost:8000/api/items/${name}`)
        .then((res) => {
            const item = res.data;
            dispatch(receiveItemDetail(item));
        })
        .catch(err => {
            dispatch(itemDetailFailed(err))
        });
    }
}

export const buyItem = (user, item, amount) => {
    return dispatch => {
        dispatch(itemBuyStart());

        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post("http://localhost:8000/api/items/buy/", {
            user: user,
            item: item,
            amount: amount,
        })
        .then((res) => {
            const message = res.data;
            dispatch(itemBuyEnd(message));
        })
        .catch(err => {
            dispatch(itemBuyFail(err))
        });
    }
}
