import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    allTrades: [],
    userTrades: [],
    fetchingAllTrades: false,
    fetchingUserTrades: false,
    message: '',
    error: ''
}

const getAllTradesStart = (state, action) => {
    return updateObject(state, {
        fetchingAllTrades: true,
    });
}

const getUserTradesStart = (state, action) => {
    return updateObject(state, {
        fetchingUserTrades: true,
    });
}

const getAllTradesEnd = (state, action) => {
    return updateObject(state, {
        allTrades: action.payload.allTrades,
        fetchingAllTrades: false,
    });
}

const getUserTradesEnd = (state, action) => {
    return updateObject(state, {
        userTrades: action.payload.userTrades,
        fetchingUserTrades: true,
    });
}

const getAllTradesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fetchingAllTrades: false,
    });
}

const getUserTradesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fetchingUserTrades: true,
    });
}

const addTradeEnd = (state, action) => {
    return updateObject(state, {
        message: action.message
    });
}

const tradesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ALL_TRADES:
            return getAllTradesStart(state, action);
        case actionTypes.RECEIVED_ALL_TRADES:
            return getAllTradesEnd(state, action);
        case actionTypes.ALL_TRADES_FAIL:
            return getAllTradesFail(state, action);
        case actionTypes.REQUEST_USER_TRADES:
            return getUserTradesStart(state, action);
        case actionTypes.RECEIVED_USER_TRADES:
            return getUserTradesEnd(state, action);
        case actionTypes.USER_TRADES_FAIL:
            return getUserTradesFail(state, action);
        case actionTypes.ADD_TRADE_END:
            return addTradeEnd(state, action);
        default:
            return state;

    }
}

export default tradesReducer;
