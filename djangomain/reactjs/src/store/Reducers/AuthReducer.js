import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    token: null,
    auth: false,
    signInError: null,
    signUpError: null,
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
                signInError: null,
                signUpError: null,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                signInError: action.error,
            };
        case actionTypes.SIGN_UP_FAIL:
            return {
                ...state,
                loading: false,
                signUpError: action.error,
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
