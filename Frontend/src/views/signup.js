import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Snackbar } from '@material-ui/core';
import {useAuth} from '../Auth';
import userservice from '../api/userservice';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  
  const history = useHistory();
  const {auth} = useAuth();

  const signup = async () => {
    try {
      if (!username || !password || !company || !role) {
        setError('Fields are required!');
        return;
      }
      await auth.signUp(username, password, company, role);
      const res = await userservice.signup(username, company, role);
      if (res.err) {
        setError(res.err.message || 'Signup failed!');
        return;
      }
      history.push('/signin');
    } catch (ex) {
      console.log(ex)
      setError(ex.message || 'Signup failed!');
    }
  }

  return (
    <div className="container d-flex flex-column">
      <div className="menu">
        <span className="font-bold font-30">PARABOLA</span>
        <Link to="/signin" className="font-14">Log in</Link>
      </div>
      <div className="page-description">
        <span className="font-24">Collabrative Project Sync for Teams</span>
      </div>
      <div className="sign-form">
        <div className="sign-up">
          <div className="input-group">
            <div className="input-label">Username:</div>
            <Input className='input-text' value={username} onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="input-group">
            <div className="input-label">Password:</div>
            <Input type="password" className='input-text' value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="input-group">
            <div className="input-label">Company:</div>
            <Input className='input-text' value={company} onChange={e => setCompany(e.target.value)}/>
          </div>
          <div className="input-group">
            <div className="input-label">Role:</div>
            <Input className='input-text' value={role} onChange={e => setRole(e.target.value)}/>
          </div>
          <div className='sign-btn-container'>
            <div className="button" onClick={signup}>SIGN UP</div>
          </div>
        </div>
      </div>
      <Snackbar open={!!error} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => setError('')}>
        <div className="error-msg">{error}</div>
      </Snackbar>
    </div>
  )
}

export default Signup;
