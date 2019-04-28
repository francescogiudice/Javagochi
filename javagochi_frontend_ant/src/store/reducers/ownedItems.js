import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    items: [],
    selectedItem: {},
    fetchingItems: false,
    fetchingItem: false,
    error: ''
}

const getItemsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingItems: true
    })
}

const getItemStart = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingItem: true
    })
}

const getItemsSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        fetchingItems: false,
        items: action.payload.ownedItems
    })
}

const getItemSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        error: null,
        fetchingItem: false,
        selectedItem: action.payload.selectedOwnedItem
    })
}

const getItemsError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fetchingItems: false,
        items: []
    })
}

const getItemError = (state, action) => {
    return updateObject(state, {
        error: action.error,
        fetchingItem: false,
        selectedItem: {}
    });
}

const ownedItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_USER_ITEMS:
            return getItemsStart(state, action);
        case actionTypes.RECEIVED_USER_ITEMS:
            return getItemsSuccess(state, action);
        case actionTypes.OWNED_ITEMS_FAIL:
            return getItemsError(state, action);
        case actionTypes.REQUEST_USER_ITEM_DETAIL:
            return getItemStart(state, action);
        case actionTypes.RECEIVED_USER_ITEM_DETAIL:
            return getItemSuccess(state, action);
        case actionTypes.OWNED_ITEM_DETAIL_FAIL:
            return getItemError(state, action);
        default:
            return state;

    }
}

export default ownedItemsReducer;
