import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    token: null,
    auth: false,
    error: null,
    loading: false,
    email: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                auth: true,
                loading: false,
                email: action.email,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                auth: false,
            };
        default:
            return state;
    }
};

export default authReducer;
