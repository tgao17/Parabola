import { Constants } from '../_constants';
import api from '../../api/userservice';
import utils from '../../utils';

export const actions = {
  signin,
  signout,
  verify,
  setUser,
  setError,
  setProjectName
}

function setUser(data) {
  return {
    type: Constants.SETUSER,
    payload: data
  }
}

function setProjectName(name) {
  return {
    type: Constants.SETPROJECTNAME,
    projectName: name
  }
}

function signin(data) {
  return dispatch => {
    let { email } = data;
    email = (email || '').replace(/ /g, '').toLocaleLowerCase();
    if (!email) return dispatch(setError('Input valid email!'));
    if (!utils.validateEmail(email)) return dispatch(setError('Input valid email!'));
    api.signin(email)
      .then(data => {
        if (!data || !data.user || data.error) {
          dispatch({
            type: Constants.SIGNIN_FAILED,
            error: (data && data.error) || 'Signin Failed!'
          })
          return;
        }
        localStorage.setItem('token', data.token);
        dispatch({
          type: Constants.SIGNIN_SUCCESS,
          email: data.user.email,
          _id: data.user._id
        });
      });
  }
}

function verify(token) {
  return dispatch => api.verifyUser(token)
    .then(data => {
    if (!data || data.error) {
      localStorage.setItem('token', '');
      return;
    }
    localStorage.setItem('token', data.token);
    dispatch({
      type: Constants.SIGNIN_SUCCESS,
      email: data.user.email,
      _id: data.user._id
    });
  });
}

function signout() {
  localStorage.removeItem('token')
  return { type: Constants.SIGNOUT }
}

function setError(error) {
  return {
    type: Constants.SETERROR,
    error
  }
}