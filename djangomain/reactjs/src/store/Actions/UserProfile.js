import * as actionTypes from '../Actions/ActionTypes';
import axios from 'axios';

export const userProfilePullStart = () => {
    return {
        type: actionTypes.USER_PROFILE_PULL_START,
    };
};

export const userProfilePullSuccess = (data) => {
    return {
        type: actionTypes.USER_PROFILE_PULL_SUCCESS,
        data: data,
    };
};

export const userProfilePullFail = (error) => {
    return {
        type: actionTypes.USER_PROFILE_PULL_FAIL,
        error: error,
    };
};

export const userProfilePushStart = () => {
    return {
        type: actionTypes.USER_PROFILE_PUSH_START,
    };
};

export const userProfilePushSuccess = () => {
    return {
        type: actionTypes.USER_PROFILE_PUSH_SUCCESS,
    };
};

export const userProfilePushFail = (error) => {
    return {
        type: actionTypes.USER_PROFILE_PUSH_FAIL,
        error: error,
    };
};

export const userProfilePull = (email) => {
    return (dispatch) => {
        dispatch(userProfilePullStart());
        axios
            .get(`http://127.0.0.1:8000/api/users/?search=${email}`)
            .then((response) => {
                dispatch(userProfilePullSuccess(response.data));
            })
            .catch((error) => {
                dispatch(userProfilePullFail(error));
            });
    };
};

export const userProfilePush = (biography, linkedin, token, userId) => {
    return (dispatch) => {
        dispatch(userProfilePushStart());
        const postData = {
            biography: biography,
            linkedin: 'https://' + linkedin,
        };
        const config = {
            headers: {
                Authorization: 'Token ' + { token },
            },
        };
        axios
            .patch(
                `http://127.0.0.1:8000/api/users/${userId}/`,
                postData,
                config
            )
            .then((response) => {
                console.log(response);
                dispatch(userProfilePushSuccess());
            })
            .catch((error) => {
                console.log(error);
                dispatch(userProfilePushFail(error));
            });
    };
};
