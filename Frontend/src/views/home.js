import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Edit, PlusOneRounded } from '@material-ui/icons';
import { Input } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux"
import userservice from '../api/userservice';
import { actions } from '../redux/_actions';
import { useAuth } from '../Auth';

const Signin = () => {  
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const { auth } = useAuth();
  
  const { username, role, company } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchProjects();
  }, [username])

  const goManage = (id, name) => {
    dispatch(actions.setProjectName(name));
    history.push(`/project/${id}`);
  }

  const fetchProjects = async () => {
    if (username) {
      const res = await userservice.GetAllProjects(username);
      if (!res || res.err) {
        dispatch(actions.setError(res.err.message || 'Fetch Projects failed!'));
        return;
      }
      setProjects(res.response.projectsList);
    }
  }

  const createProject = async () => {
    if (!projectName) return dispatch(actions.setError('Input Project Name'));
    await userservice.CreateProject({company: { username, role, company }, projectName});
    fetchProjects();
  }

  const changeProjectName = (idx, name) => {
    projects[idx].name = name;
    setProjects([...projects]);
  }

  const updateProjectName = async (idx) => {
    await userservice.UpdateProject({ projectId: projects[idx].id, projectName: projects[idx].name });
    // await fetch();
  }

  const signout = async () => {
    await auth.signOut();
    history.push('/signin');
  }

  return (
    <div className="container d-flex flex-column">
      <div className="menu">
        <span className="font-14">Home</span>
        <a onClick={signout} className="font-14">Log Out</a>
      </div>
      <div className="page-header">
        <span className="font-36 font-bold">Home</span>
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
      <div className="main-content">
        <div className='font-14 sub-header'>PROJECTS</div>
        <table className='table'>
          <thead>
            <tr>
              <th width="20"></th>
              <th width="300"></th>
              <th width="80"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <tr key={idx}>
                <td>{idx + 1}.</td>
                <td>
                  <div className='home-project-item'>
                    {/* <span className="home-project-name bg bg-active">{project.name}</span> */}
                    <Input className="input-text home-project-name bg bg-active" value={project.name} onChange={(e) => changeProjectName(idx, e.target.value)}/>
                    <span className="icon-btn bg bg-dark" onClick={() => updateProjectName(idx)}>
                      <Edit />
                    </span>
                  </div>
                </td>
                <td className='text-center'><div className="button" onClick={() => goManage(project.id, project.name)}>Manage</div></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>
                <div className='home-project-item'>
                  <span className="home-project-name"><Input className='input-text' value={projectName} onChange={e => setProjectName(e.target.value)}/></span>
                  <span className="icon-btn bg bg-dark" onClick={createProject}>
                    <span>+</span>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Signin;
