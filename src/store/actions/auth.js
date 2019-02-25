import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDKv4FBvQvHZ_HrVD2vMvU0BNPg6y2yMoQ';
    if (!isSignup) {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDKv4FBvQvHZ_HrVD2vMvU0BNPg6y2yMoQ';
    }
    axios
      .post(url, authData)
      .then((res) => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};
