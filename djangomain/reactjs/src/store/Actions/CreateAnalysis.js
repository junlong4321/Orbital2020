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

export const createAnalysis = (image, title, text, email, name, ticker) => {
    return (dispatch) => {
        dispatch(createAnalysisStart());
        console.log(image);
        const analysisData = {
            images: image,
            title: title,
            text: text,
            author: email,
            name: name,
            ticker: ticker,
        };
        axiosDb
            .post('/api/analyses/', analysisData)
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

export const editAnalysis = (image, title, text, email, name, ticker) => {
    return (dispatch) => {
        dispatch(createAnalysisStart());
        // const analysisData = {
        //     images: image,
        //     title: title,
        //     text: text,
        //     author: email,
        //     name: name,
        //     ticker: ticker,
        // };
        let form_data = new FormData();

        form_data.append('title', title);
        form_data.append('text', text);
        form_data.append('cover_image', image);
        form_data.append('author', email);
        form_data.append('name', name);
        form_data.append('ticker', ticker);
        axiosDb
            .post('/api/analyses/', form_data, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            .then((response) => {
                dispatch(createAnalysisSuccess(response));
            })
            .catch((error) => {
                dispatch(createAnalysisFailure(error));
            });
    };
};
