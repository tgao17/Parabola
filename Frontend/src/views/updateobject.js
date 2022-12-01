import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import { Input } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux"
import projectservice from '../api/projectservice';
import objectservice from '../api/objectservice';
import { actions } from '../redux/_actions';
import { useAuth } from '../Auth';

const UpdateObject = (props) => {
  const [projectId, setProjectId] = useState('');
  const [objectId, setObjectId] = useState('');
  const [objectName, setObjectName] = useState('');
  const [objectVersion, setObjectVersion] = useState('');
  const [companies, setCompanies] = useState([]);
  const [originalCompanies, setOriginalCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [searchCompanies, setSearchCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();

  const { username, role, company, projectName } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    setObjectId(props.match.params.id);
    setProjectId(props.match.params.projectId);
    if (!objectId || !username) return;
    fetch();
  }, [objectId, projectId, username])

  useEffect(() => {
    const com = allCompanies;
    setSearchCompanies(com.filter(itm => {
      const idx = originalCompanies.findIndex(com => com.username.toLocaleLowerCase() === itm.username.toLocaleLowerCase());
      return idx === -1
    }))
  }, [originalCompanies, allCompanies])
  
  const fetchComapnies = async () => {
    if (objectId == '0') {
      setCompanies([{ companyName: company, username: username, role: role }]);
      setOriginalCompanies([{ companyName: company, username: username, role: role }]);
      return ;
    }
    const res = await objectservice.GetAllCompaniesInObject(objectId);
    if (!res || res.err) {
      dispatch(actions.setError(res.err.message || 'Fetch CompaniesInObject failed!'));
      return;
    }
    setCompanies([...res.response.companiesList]);
    setOriginalCompanies([...res.response.companiesList]);
  }

  const fetchObjects = async () => {
    const res = await objectservice.GetAllObjectsInProjectForUser({ username, projectId });
    if (!res || res.err) {
      dispatch(actions.setError(res.err.message || 'Fetch Objects failed!'));
      return;
    }
    const objects = res.response.objectsList;
    const object = objects.find(object => object.objectId == objectId)
    setObjectName((object && object.name) || '');
    setObjectVersion((object && object.latestVersion) || '1.0.0')
  }

  const fetchAllCompanies = async () => {
    const res = await projectservice.GetAllCompaniesInProject(projectId);
    if (!res || res.err) {
      dispatch(actions.setError(res.err.message || 'Fetch AllCompanies failed!'));
      return;
    }
    setAllCompanies(res.response.companiesList)
  }

  const isInList = (list, com) => {
    const idx = list.findIndex(itm => itm.username === com.username);
    return idx > -1;
  }

  const saveObject = async () => {
    if (!objectName) {
      dispatch(actions.setError('Input Object name!'));
      return;
    }
    let id = objectId;
    if (objectId == '0') {
      const res = await projectservice.CreateObjectInProject({ projectId, objectName, username });
      id = res.response.objectId;
    }
    for (let i = 0; i < allCompanies.length; i ++) {
      const com = allCompanies[i];
      const is_o = isInList(originalCompanies, com),
        is_a = isInList(companies, com);
      if (is_o && !is_a) await objectservice.RemoveCompanyInObject({ objectId: id, company: com })
      if (!is_o && is_a) await objectservice.AddCompanyToObject({ objectId: id, userAdder: username, userAdded: com.username })
    }
    await UpdateObject(id);
    cancelObject();
  }
  const deleteObject = async () => {
    await objectservice.DeleteObject(objectId);
    cancelObject();
  }

  const fetch = async () => {
    await fetchObjects();
    await fetchComapnies();
    await fetchAllCompanies();
  }

  const addCompany = async (idx) => {
    // await objectservice.AddCompanyToObject({ objectId, userAdder: username, userAdded: searchCompanies[idx].username })
    companies.push(searchCompanies[idx]);
    searchCompanies.splice(idx, 1);
    setCompanies([...companies]);
    setSearchCompanies([...searchCompanies]);
  }

  const signout = async () => {
    await auth.signOut();
    history.push('/signin');
  }

  const removeCompany = async (idx) => {
    // await objectservice.RemoveCompanyInObject({ objectId, company: companies[idx] })
    searchCompanies.push(companies[idx]);
    companies.splice(idx, 1);
    setCompanies([...companies]);
    setSearchCompanies([...searchCompanies]);
  }

  const UpdateObject = async (id) => {
    let version = objectVersion.replace(/\./g, '');
    version = parseFloat(version) + 1 + '';
    version = version[0] + '.' + version[1] + '.' + version[2];
    if (objectId == '0') version = '1.0.0';
    await objectservice.UpdateObjectVersion({ objectId: id || objectId, username, name: objectName, version });
    // setObjectVersion(version)
  }

  const cancelObject = () => {
    history.push(`/project/${projectId}`);
  }

  return (
    <div className="container d-flex flex-column">
      <div className="menu">
        <a onClick={() => history.push('/home')} className="font-14">Home</a>
        <a onClick={signout} className="font-14">Log Out</a>
      </div>
      <div className="page-header">
        <span className="font-36 font-bold">UPDATE PRIMARY OBJECT</span>
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
      <div className="main-content project-content update-object-table">
        <table className='table'>
          <thead>
            <tr>
              <th width="100"></th>
            </tr>
          </thead>
          <tbody>
            <tr className='has-head'>
              <td>OBJECT NAME</td>
            </tr>
            <tr>
              <td>
                <div className='home-project-item'>
                  <Input className="home-project-name font-20 input-text" value={objectName} onChange={(e) => setObjectName(e.target.value)} />
                  <span className="icon-btn bg bg-dark" onClick={UpdateObject}>
                    <Edit />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className='table'>
          <thead>
            <tr>
              <th width="20"></th>
              <th width="300"></th>
              <th width="50"></th>
            </tr>
          </thead>
          <tbody>
            <tr className='has-head'>
              <td colSpan={2}>AFFILIATED PARTIES</td>
            </tr>
            {companies.map((company, idx) => (company.username.toLocaleLowerCase() !== username) && (
              <tr key={idx}>
                <td className='text-right'>{idx + 1}.</td>
                <td>
                  <div className='project-item bg'>
                    <span>{company.companyName}</span>
                    <span>{company.role}</span>
                  </div>
                </td>
                <td className='text-center text-decoration'><div className="button" onClick={() => {removeCompany(idx)}}>Remove</div></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td className='bg'></td>
              <td>
                <div className='home-project-item'>
                  <span className="icon-btn bg bg-dark" onClick={() => setShowModal(true)}>
                    <span>+</span>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={'update-object-right ' + (showModal ? 'tab' : '')}>
          {!showModal &&
            <table className='table'>
              <thead>
                <tr>
                  <th width="150"></th>
                </tr>
              </thead>
              <tbody>
                <tr className='has-head'>
                  <td>CURRENT VERSION</td>
                </tr>
                <tr>
                  <td>
                    <span className="font-20">{objectVersion}</span>
                  </td>
                </tr>
              </tbody>
            </table> }
          {showModal &&
            <>
              <table className='table'>
                <thead>
                  <tr>
                    <th width="20"></th>
                    <th width="300"></th>
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
              <div className='close-btn' style={{marginTop: '50px'}} onClick={() => setShowModal(false)}>Close</div>
            </>
          }
        </div>
      </div>
      {/* <div style={{marginTop: '100px'}}>        
        <table className='table'>
          <thead>
            <tr>
              <th width="150"></th>
            </tr>
          </thead>
          <tbody>
            <tr className='has-head'>
              <td>INFORMATION</td>
            </tr>
            <tr>
              <td>
                <div style={{width: '975px'}}>
                  <textarea className='input-area'></textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <div className='buttons'>
        <div className='save-btn' onClick={saveObject}>Save</div>
        <div className='delete-btn' onClick={deleteObject}>Delete</div>
        <div className='cancel-btn' onClick={cancelObject}>Cancel</div>
      </div>
    </div>
  )
}

export default UpdateObject;
