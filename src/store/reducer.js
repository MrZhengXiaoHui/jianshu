import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../components/header/store';

export default combineReducers({
    header: headerReducer
});
