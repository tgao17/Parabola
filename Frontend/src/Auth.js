import {Auth} from 'aws-amplify';
import React, {useEffect} from 'react';
import { useDispatch } from "react-redux"
import userservice from './api/userservice';
import { actions } from './redux/_actions';

const AuthContext = React.createContext({ user: null, error: null });

export function useAuth() {
  return {auth: React.useContext(AuthContext)};
}

export function AuthProvider({children}) {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [role, setRole] = React.useState('');

  const dispatch = useDispatch();

  const setUserInfo = async (user) => {
    if (!user) return;
    const username = user.username;
    const res = await userservice.GetCompanyInfo(username);
    if(res.err) return;
    dispatch(actions.setUser(res.response));
  }

  useEffect(() => {
    Auth.currentUserInfo()
      .then(user => {
        setUser(user);
        setUserInfo(user);
      })
      .catch(() => {
        console.log('fetch user failed');
      });

    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        setUserInfo(user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const signIn = async (username, password) => {
    const res = await Auth.signIn(username, password);
    setUser(res);
  };

  const signOut = async () => {
    await Auth.signOut();
    setUser(null);
  };

  const signUp = async (username, password) => {
    await Auth.signUp({username, password});
  }

  const value = {
    user,
    username, setUsername,
    company, setCompany,
    role, setRole,
    error, setError,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
