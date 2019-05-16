import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    items: [],
    selectedItem: {},
    fetchingItems: false,
    fetchingItem: false,
    performingBuy: false,
    message: '',
    error: ''
}

const getItemsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingItems: true
    });
}

const getItemStart = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingItem: true
    });
}

const getItemsSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingItems: false,
        items: action.payload.items
    });
}

const getItemSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingItem: false,
        selectedItem: action.payload.selectedItem
    });
}

const getItemsError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fetchingItems: false,
        items: []
    });
}

const getItemError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fetchingItem: false,
        selectedItem: {}
    });
}

const startBuy = (state, action) => {
    return updateObject(state, {
        performingBuy: true
    });
}

const endBuy = (state, action) => {
    return updateObject(state, {
        performingBuy: false,
        message: action.message
    });
}

const failBuy = (state, action) => {
    return updateObject(state, {
        performingBuy: false,
        error: action.error
    });
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_ITEMS:
            return getItemsStart(state, action);
        case actionTypes.RECEIVED_ITEMS:
            return getItemsSuccess(state, action);
        case actionTypes.ITEMS_FAILED:
            return getItemsError(state, action);
        case actionTypes.REQUEST_ITEM_DETAIL:
            return getItemStart(state, action);
        case actionTypes.RECEIVED_ITEM_DETAIL:
            return getItemSuccess(state, action);
        case actionTypes.ITEM_DETAIL_FAILED:
            return getItemError(state, action);
        case actionTypes.ITEM_BUY_START:
            return startBuy(state, action);
        case actionTypes.ITEM_BUY_END:
            return endBuy(state, action);
        case actionTypes.ITEM_BUY_FAIL:
            return failBuy(state, action);
        default:
            return state;

    }
}

export default itemsReducer;
