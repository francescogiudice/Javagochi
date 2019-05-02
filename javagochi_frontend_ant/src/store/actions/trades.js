import * as actionTypes from './actionTypes';
import axios from 'axios';

export const requestAllTrades = () => {
    return {
        type: actionTypes.REQUEST_ALL_TRADES
    }
}

export const requestUserTrades = () => {
    return {
        type: actionTypes.REQUEST_USER_TRADES
    }
}

export const receiveAllTrades = (trades) => {
    return {
        type: actionTypes.RECEIVED_ALL_TRADES,
        payload: {
            allTrades: trades
        }
    }
}

export const receiveUserTrades = (trades) => {
    return {
        type: actionTypes.RECEIVED_USER_TRADES,
        payload: {
            userTrades: trades
        }
    }
}

export const allTradesFail = (err) => {
    return {
        type: actionTypes.ALL_TRADES_FAIL,
        error: err
    }
}

export const userTradesFail = (err) => {
    return {
        type: actionTypes.USER_TRADES_FAIL,
        error: err
    }
}

export const getAllTrades = (user) => {
    return dispatch => {
        dispatch(requestAllTrades());

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

        axios.get(`http://localhost:8000/api/trades/${user}/all/`)
        .then(res => {
            const trades = res.data;
            dispatch(receiveAllTrades(trades));
        })
        .catch(err => {
            dispatch(allTradesFail(err))
        })
    }
}

export const getAllUserTrades = (user) => {
    return dispatch => {
        dispatch(requestUserTrades());

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

        axios.get(`http://localhost:8000/api/users/${user}/trades/`)
        .then(res => {
            const trades = res.data;
            dispatch(receiveUserTrades(trades));
        })
        .catch(err => {
            dispatch(userTradesFail(err))
        })
    }
}

export const addTradeStart = () => {
    return {
        type: actionTypes.ADD_TRADE_START
    }
}

export const addTradeEnd = (message) => {
    return {
        type: actionTypes.ADD_TRADE_END,
        message: message
    }
}

export const addTradeFail = (err) => {
    return {
        type: actionTypes.ADD_TRADE_FAIL,
        error: err
    }
}

export const addTrade = (offeredId, interestedInto) => {
    return dispatch => {
        dispatch(addTradeStart());

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

        axios.post("http://localhost:8000/api/trades/add/", {
          offered_id: offeredId,
          interested_into: interestedInto,
        })
        .then(res => {
            const trades = res.data;
            dispatch(addTradeEnd(trades));
        })
        .catch(err => {
            dispatch(addTradeFail(err))
        })
    }
}
