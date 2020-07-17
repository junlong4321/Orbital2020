import * as actionTypes from './ActionTypes';
import axiosDb from '../../components/axios/axiosDb';

export const createAnalysisStart = () => {
    return {
        type: actionTypes.CREATE_ANALYSIS_START,
    };
};

export const createAnalysisSuccess = (response) => {
    return {
        type: actionTypes.CREATE_ANALYSIS_SUCCESS,
        response: response,
    };
};

export const createAnalysisFailure = (error) => {
    return {
        type: actionTypes.CREATE_ANALYSIS_FAILURE,
        error: error,
    };
};

export const editAnalysisStart = () => {
    return {
        type: actionTypes.EDIT_ANALYSIS_START,
    };
};

export const editAnalysisSuccess = (response) => {
    return {
        type: actionTypes.EDIT_ANALYSIS_SUCCESS,
        response: response,
    };
};

export const editAnalysisFailure = (error) => {
    return {
        type: actionTypes.EDIT_ANALYSIS_FAILURE,
        error: error,
    };
};

export const createAnalysis = (image, title, text, email, name, ticker) => {
    return (dispatch) => {
        dispatch(createAnalysisStart());
        console.log(image);
        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('text', text);
        form_data.append('author', email);
        form_data.append('name', name);
        form_data.append('ticker', ticker);
        if (image !== undefined) {
            form_data.append('cover_image', image);
        }
        console.log(form_data);
        axiosDb
            .post('/api/analyses/', form_data, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            .then((response) => {
                dispatch(createAnalysisSuccess(response));
                // console.log(response);
            })
            .catch((error) => {
                dispatch(createAnalysisFailure(error));
                // console.log(error);
            });
    };
};

export const editAnalysis = (image, title, text, email, name, analysisId) => {
    return (dispatch) => {
        dispatch(editAnalysisStart());
        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('text', text);
        form_data.append('author', email);
        form_data.append('name', name);
        if (image !== undefined) {
            form_data.append('cover_image', image);
        }
        axiosDb
            .patch(`/api/analyses/${analysisId}/`, form_data, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            .then((response) => {
                dispatch(editAnalysisSuccess(response));
            })
            .catch((error) => {
                dispatch(editAnalysisFailure(error));
            });
    };
};
