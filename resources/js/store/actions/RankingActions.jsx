import { LIST, LIST_SUCCESS, LIST_ERROR } from '../types/RankingTypes';
import RankingApi from '../../api/RankingApi';

listRanking = () => {
    return function (dispatch, getState) {
        // start sending request (first dispatch)
        dispatch({
            type: LIST
        });
        // async call must dispatch action whether on success or failure
        RankingApi.list(page).then(response => {
            dispatch({
                type: LIST_SUCCESS,
                data: response.data.data
            });
        }).catch(error => {
            dispatch({
                type: LIST_ERROR,
                error: error.response.data
            });
        });
    }
}

export {
    listCategories
};