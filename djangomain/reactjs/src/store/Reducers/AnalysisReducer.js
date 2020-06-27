import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    analysisData: null,
    loading: true,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ANALYSIS_PULL:
            return {
                ...state,
                analysisData: action.analysisData,
                loading: false,
            };
        case actionTypes.ANALYSIS_PULL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default authReducer;
