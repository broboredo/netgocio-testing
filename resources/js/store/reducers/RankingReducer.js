import { LIST,
    LIST_SUCCESS,
    LIST_ERROR
} from '../types/RankingTypes';

const initialState = {
    ranking: [],
};

const rankingReducer = function (state = initialState, action) {
     switch (action.type) {
           case LIST:
            return {
                ...state
            };
        case LIST_SUCCESS:
            return {
                ...state,
                ranking: action.data
            };
        case LIST_ERROR:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false
            };
        default:
            return state;
     }
};
export default rankingReducer;