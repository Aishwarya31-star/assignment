import { combineReducers } from 'redux';
import { userReducer } from  '../components/user/store/reducer';




const rootReducer = combineReducers({
    user: userReducer,

});

export default rootReducer;
