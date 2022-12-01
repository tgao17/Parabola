import { API_URL } from '../config';

import { Company } from '../proto/company_pb';
import { SignupRequest, GetCompanyInfoRequest, GetAllProjectsRequest, CreateProjectRequest, UpdateProjectRequest } from '../proto/user_service_pb';
import { UserServiceClient } from '../proto/user_service_grpc_web_pb';

const client = new UserServiceClient(API_URL, null, null);

export default {
  signup: (username, company, role) => {
    return new Promise(resolve => {
      const com = new Company();
      com.setUsername(username);
      com.setCompanyName(company);
      com.setRole(role);
  
      const request = new SignupRequest();
      request.setCompany(com);
  
      client.signup(request, {}, (err, response) => {
        resolve({ err, response });
      })
    })
  },
  GetCompanyInfo: (username) => {
    return new Promise(resolve => {
      const request = new GetCompanyInfoRequest();
      request.setUsername(username);

      client.getCompanyInfo(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        const com = response.getCompany();
        const username = com.getUsername();
        const company = com.getCompanyName();
        const role = com.getRole();
        resolve({ err, response: { username, company, role } });
      })
    })
  },
  GetAllProjects: (username) => {
    return new Promise(resolve => {
      const request = new GetAllProjectsRequest();
      request.setUsername(username);

      client.getAllProjects(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  CreateProject: ({projectName, company}) => {
    return new Promise(resolve => {
      const request = new CreateProjectRequest();
      request.setProjectName(projectName);
      const com = new Company();
      com.setUsername(company.username);
      com.setCompanyName(company.company);
      com.setRole(company.role);
      request.setCompany(com);

      client.createProject(request, {}, (err, response) => {
        resolve({ err, response });
      })
    })
  },
  UpdateProject: ({projectName, projectId}) => {
    return new Promise(resolve => {
      const request = new UpdateProjectRequest();
      request.setProjectName(projectName);
      request.setProjectId(projectId);

      client.updateProject(request, {}, (err, response) => {
        resolve({ err, response });
      })
    })
  }
}