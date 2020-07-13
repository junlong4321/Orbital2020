import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    commentsData: null,
    commentsPullError: null,
    commentsPullLoading: false,
    commentsPostError: null,
    commentsPostSuccess: false,
    commentsPostLoading: false,
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMMENT_PULL_START:
            return {
                ...state,
                commentsPullLoading: true,
            };
        case actionTypes.COMMENT_PULL_SUCCESS:
            return {
                ...state,
                commentsData: action.data,
                commentsPullLoading: false,
            };
        case actionTypes.COMMENT_PULL_FAILURE:
            return {
                ...state,
                commentsPullError: action.error,
                commentsPullLoading: false,
            };
        case actionTypes.COMMENT_POST_START:
            return {
                ...state,
                commentsPullLoading: true,
                commentsPostSuccess: false,
            };
        case actionTypes.COMMENT_POST_SUCCESS:
            return {
                ...state,
                commentsPostLoading: false,
                commentsPostSuccess: true,
            };
        case actionTypes.COMMENT_POST_FAILURE:
            return {
                ...state,
                commentsPostError: action.error,
                commentsPostLoading: false,
                commentsPostSuccess: false,
            };
        default:
            return state;
    }
};

export default commentsReducer;
