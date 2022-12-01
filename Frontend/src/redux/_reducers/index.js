import { combineReducers } from 'redux';
import { Constants } from '../_constants';

let user = {
  username: '',
  company: '',
  role: '',
  error: ''
}
// let token = localStorage.getItem('token');

const initialState = () => user
    //   return token ? { loggedIn: true, user } : { loggedIn: false };

function auth(state = initialState(), action) {
  console.log(action);
  switch (action.type) {
    case Constants.SETUSER:
      return {
        ...state,
        ...action.payload
      }
    case Constants.SETPROJECTNAME:
      return {
        ...state,
        projectName: action.projectName
      }
    case Constants.SIGNIN_SUCCESS:
    case Constants.VERIFY:
      return {
        email: action.email,
        _id: action._id,
        error: ''
      };
    case Constants.SIGNIN_FAILED:
      return {
        ...user,
        error: action.error
      }
    case Constants.SIGNOUT:
      return { ...user };
    case Constants.SETERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;