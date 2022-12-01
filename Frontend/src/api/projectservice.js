import { API_URL } from '../config';

import { Company } from '../proto/company_pb';
import { GetAllCompaniesRequest, AddCompanyToProjectRequest, GetAllCompaniesInProjectRequest, CreateObjectRequest, RemoveCompanyInProjectRequest } from '../proto/project_service_pb';
import { ProjectServiceClient } from '../proto/project_service_grpc_web_pb';

const client = new ProjectServiceClient(API_URL, null, null);

export default {
  GetAllCompanies: () => {
    return new Promise(resolve => {
      const request = new GetAllCompaniesRequest();

      client.getAllCompanies(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  AddCompanyToProject: ({projectId, company}) => {
    return new Promise(resolve => {
      const request = new AddCompanyToProjectRequest();
      request.setProjectId(projectId);
      const com = new Company();
      com.setUsername(company.username);
      com.setCompanyName(company.companyName);
      com.setRole(company.role);
      request.setCompany(com);
      client.addCompanyToProject(request, {}, (err, response) => {
        resolve({ err, response });
      })
    })
  },
  GetAllCompaniesInProject: (projectId) => {
    return new Promise(resolve => {
      const request = new GetAllCompaniesInProjectRequest();
      request.setProjectId(projectId);
      client.getAllCompaniesInProject(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  CreateObjectInProject: ({projectId, objectName, username}) => {
    return new Promise(resolve => {
      const request = new CreateObjectRequest();
      request.setProjectId(projectId);
      request.setObjectName(objectName);
      request.setUsername(username);
      client.createObjectInProject(request, {}, (err, response) => {
        resolve({ err, response: response.toObject() });
      })
    })
  },
  RemoveCompanyInProject: ({projectId, company}) => {
    return new Promise(resolve => {
      const request = new RemoveCompanyInProjectRequest();
      request.setProjectId(projectId);
      const com = new Company();
      com.setUsername(company.username);
      com.setCompanyName(company.companyName);
      com.setRole(company.role);
      request.setCompany(com);
      console.log(request, company)
      client.removeCompanyInProject(request, {}, (err, response) => {
        console.log(err, response)
        resolve({ err, response });
      })
    })
  },
}
