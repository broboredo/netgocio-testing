import { combineReducers } from 'redux';
import rankingReducer  from './RankingReducer';

const rootReducer = combineReducers({
   ranking: rankingReducer
});
export default rootReducer;