import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    data: null,
    pullLoading: false,
    pullError: null,
    pushLoading: false,
    pushError: null,
};

const userProfile = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_PULL_START:
            return {
                ...state,
                pullLoading: true,
            };
        case actionTypes.USER_PROFILE_PULL_SUCCESS:
            return {
                ...state,
                pullLoading: false,
                data: action.data,
            };
        case actionTypes.USER_PROFILE_PULL_FAIL:
            return {
                ...state,
                pullLoading: false,
                pullError: action.error,
            };
        case actionTypes.USER_PROFILE_PUSH_START:
            return {
                ...state,
                pushLoading: true,
            };
        case actionTypes.USER_PROFILE_PUSH_SUCCESS:
            return {
                ...state,
                pushLoading: false,
            };
        case actionTypes.USER_PROFILE_PUSH_FAIL:
            return {
                ...state,
                pushLoading: false,
                pushError: action.error,
            };
        default:
            return state;
    }
};

export default userProfile;
