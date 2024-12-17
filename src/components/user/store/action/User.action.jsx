export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';



export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';


export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (data) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data, 
});

export const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const RESET_USER_STATE = 'RESET_USER_STATE';

// Action to reset user state
export const resetUserState = () => {
  return {
    type: RESET_USER_STATE,
  };
};


export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerUserRequest());

  try {
    const response = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.error) {
      dispatch(registerUserFailure(data.error));
    } else {
        console.log('data================',data)
      dispatch(registerUserSuccess(data));  
    }
  } catch (error) {
    dispatch(registerUserFailure('Failed to connect to the server'));
  }
};

// Function to handle login API call
export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  
  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.error) {
      dispatch({ type: LOGIN_USER_FAILURE, payload: data.error });
    } else {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          success: data.success,
          message: data.message,
          token: data.token,
          userId: data.userId,
        },
      });
    }
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAILURE, payload: 'Failed to connect to the server' });
  }
};
