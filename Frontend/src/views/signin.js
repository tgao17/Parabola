import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input } from '@material-ui/core';
import {useAuth} from '../Auth';
import { useDispatch } from "react-redux"
import userservice from '../api/userservice';
import { actions } from '../redux/_actions';

const Signin = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const {auth} = useAuth();

  const signin = async () => {
    try {
      await auth.signIn(username, password);
      const res = await userservice.GetCompanyInfo(username);
      if (res.err) {
        dispatch(actions.setError(res.err.message || 'Login failed!'));
        return ;
      }
      dispatch(actions.setUser(res.response));
      history.push('/home');
    } catch (ex) {
      dispatch(actions.setError(ex.message || 'Login failed!'));
    }
  }

  return (
    <div className="container d-flex flex-column">
      <div className="menu">
        <span className="font-bold font-30">PARABOLA</span>
        <Link to="/signup" className="font-14">Sign Up</Link>
      </div>
      <div className="page-description">
        <span className="font-24">Collabrative Project Sync for Teams</span>
      </div>
      <div className="sign-form">
        <div className="sign-in">
          <div className="input-group">
            <div className="input-label">Username:</div>
            <Input className='input-text' value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="input-group">
            <div className="input-label">Password:</div>
            <Input type="password" className='input-text' value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className='sign-btn-container'>
            <div className="button" onClick={signin}>LOG IN</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin;
