import * as actionTypes from '../Actions/ActionTypes';
import axiosDb from '../../components/axios/axiosDb';

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
        axiosDb
            .get(`/api/users/?search=${email}`)
            .then((response) => {
                dispatch(userProfilePullSuccess(response.data));
            })
            .catch((error) => {
                dispatch(userProfilePullFail(error));
            });
    };
};

export const userProfilePush = (biography, linkedin, image, userId) => {
    return (dispatch) => {
        dispatch(userProfilePushStart());
        let form_data = new FormData();
        form_data.append('biography', biography);
        form_data.append('linkedin', linkedin);
        form_data.append('profile_picture', image);
        axiosDb
            .patch(`/api/users/${userId}/`, form_data, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            .then((response) => {
                dispatch(userProfilePushSuccess());
            })
            .catch((error) => {
                dispatch(userProfilePushFail(error));
            });
    };
};
