import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.LOGOUT,
    };
};

export const signUp = (username, email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const signUpData = {
            username: email,
            password: password,
            displayedName: username,
        };
        const authData = {
            username: email,
            password: password,
        };
        axios
            .post('http://127.0.0.1:8000/api/users/', signUpData)
            .then((response) => {
                axios
                    .post('http://127.0.0.1:8000/api/auth/', authData)
                    .then((response1) => {
                        const userToken = response1.data.token;
                        localStorage.setItem('token', userToken);
                        dispatch(authSuccess(userToken));
                    })
                    .catch((error) => {
                        dispatch(authFail(error));
                    });
            })
            .catch((error) => {
                dispatch(authFail(error));
            });
    };
};

export const auth = (email, password) => {
    return (dispatch) => {
        // autheticate the user
        dispatch(authStart());
        const authData = {
            username: email,
            password: password,
        };
        axios
            .post('http://127.0.0.1:8000/api/auth/', authData)
            .then((response) => {
                const userToken = response.data.token;
                localStorage.setItem('token', userToken);
                dispatch(authSuccess(userToken));
            })
            .catch((error) => {
                dispatch(authFail(error));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
        }
    };
};
