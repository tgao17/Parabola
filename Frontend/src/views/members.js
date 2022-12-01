import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { Edit } from '@material-ui/icons';
import { Input } from '@material-ui/core';
import { actions } from '../redux/_actions';
import projectservice from '../api/projectservice';
import { useAuth } from '../Auth';

const Signin = (props) => {  
  const [projectId, setProjectId] = useState('');
  const [companies, setCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [searchCompanies, setSearchCompanies] = useState([]);
  const { auth } = useAuth();

  const { username, role, company, projectName } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setProjectId(props.match.params.projectId);
    if (!projectId || !username) return;
    fetch();
  }, [projectId, username])

  useEffect(() => {
    const com = allCompanies;
    setSearchCompanies(com.filter(itm => {
      const idx = companies.findIndex(com => com.username === itm.username);
      return idx === -1
    }))
  }, [companies, allCompanies])

  const fetchCompanies = async () => {
    const res = await projectservice.GetAllCompaniesInProject(projectId);
    if (!res || res.err) {
      dispatch(actions.setError(res.err.message || 'Fetch CompaniesInProject failed!'));
      return;
    }
    setCompanies(res.response.companiesList)
  }

  const signout = async () => {
    await auth.signOut();
    history.push('/signin');
  }

  const fetchAllCompanies = async () => {
    const res = await projectservice.GetAllCompanies();
    if (!res || res.err) {
      dispatch(actions.setError(res.err.message || 'Fetch AllCompanies failed!'));
      return;
    }
    setAllCompanies(res.response.companiesList)
  }

  const fetch = async () => {
    await fetchCompanies();
    await fetchAllCompanies();
  }

  const addCompany = async (idx) => {
    await projectservice.AddCompanyToProject({ projectId, company: searchCompanies[idx] })
    await fetch();
  }

  const removeCompany = async (idx) => {
    console.log(idx)
    await projectservice.RemoveCompanyInProject({ projectId, company: companies[idx] })
    await fetch();
  }

  const goTeamMembers = () => {
    history.push('/members');
  }

  return (
    <div className="container d-flex flex-column">
      <div className="menu">
        <a onClick={() => history.push('/home')} className="font-14">Home</a>
        <a onClick={signout} className="font-14">Log Out</a>
      </div>
      <div className="page-header">
        <span className="font-36 font-bold">EDIT TEAM MEMBERS</span>
      </div>
      <div className="detail">
        <div className='detail-group'>
          <div className='detail-label'>COMPANY</div>
          <div className='detail-value'>{company}</div>
        </div>
        <div className='detail-group'>
          <div className='detail-label'>ROLE</div>
          <div className='detail-value'>{role}</div>
        </div>
      </div>
      <div className="main-content members-content">
        <table className='table'>
          <thead>
            <tr>
              <th width="20"></th>
              <th width="320"></th>
              <th width="50"></th>
            </tr>
          </thead>
          <tbody>
            <tr className='has-head'>
              <td colSpan={2}>TEAM MEMBERS</td>
            </tr>
            {companies.map((company, idx) => (
              <tr key={idx}>
                <td className='text-right'>{idx + 1}.</td>
                <td>
                  <div className='project-item bg'>
                    <span>{company.companyName}</span>
                    <span>{company.role}</span>
                  </div>
                </td>
                <td className='text-center text-decoration'><div className="button" onClick={() => removeCompany(idx)}>
                  {(company.username.toLocaleLowerCase() !== username) && 'Remove'}
                  </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className='table'>
          <thead>
            <tr>
              <th width="20"></th>
              <th width="320"></th>
              <th width="50"></th>
            </tr>
          </thead>
          <tbody>
            <tr className='has-head'>
              <td colSpan={2}>SEARCH</td>
            </tr>
            {searchCompanies.map((company, idx) => (
              <tr key={idx}>
                <td className='text-right'>{idx + 1}.</td>
                <td>
                  <div className='project-item bg'>
                    <span>{company.companyName}</span>
                    <span>{company.role}</span>
                  </div>
                </td>
                <td className='text-center text-decoration'><div className="button" onClick={() => addCompany(idx)}>Add</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className='buttons'>
        <div className='save-btn'>Save</div>
        <div className='cancel-btn'>Cancel</div>
      </div> */}
    </div>
  )
}

export default Signin;
