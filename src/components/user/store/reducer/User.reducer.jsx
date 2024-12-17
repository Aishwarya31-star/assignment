import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  RESET_USER_STATE,
} from '../action/User.action';

const initialState = {
  loading: false,
  success: false,
  message: '',
  error: '',
  token: '',
  userId: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        success: action.payload.success, 
        message: action.payload.message, 
        error: '', 
      };
    case REGISTER_USER_FAILURE:
      return { 
        ...state, 
        loading: false, 
        success: false,  
        message: '', 
        error: action.payload, 
      };
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        error: '',
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: '',
        error: action.payload,
      };
    case RESET_USER_STATE: 
      return { 
        ...state, 
        success: false, 
        message: '', 
        error: '', 
      };
    default:
      return state;
  }
};

export default userReducer;
