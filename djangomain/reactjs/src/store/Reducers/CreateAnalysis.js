import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    error: null,
    loading: false,
    success: false,
    response: null,
};

const createAnalysis = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ANALYSIS_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.CREATE_ANALYSIS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response,
            };
        case actionTypes.CREATE_ANALYSIS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default createAnalysis;
