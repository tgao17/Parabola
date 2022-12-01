import { API_URL } from '../config';

import { Company } from '../proto/company_pb';
import { GetAllObjectsInProjectForUserRequest, AddCompanyToObjectRequest, GetAllCompaniesInObjectRequest, UpdateObjectVersionRequest,
  ApproveObjectVersionRequest, RemoveCompanyInObjectRequest, DeleteObjectRequest } from '../proto/object_service_pb';
import { ObjectServceClient } from '../proto/object_service_grpc_web_pb';

const client = new ObjectServceClient(API_URL, null, null);

export default {
  GetAllObjectsInProjectForUser: ({username, projectId}) => {
    return new Promise(resolve => {
      const request = new GetAllObjectsInProjectForUserRequest();
      request.setProjectId(projectId);
      request.setUsername(username);

      client.getAllObjectsInProjectForUser(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  AddCompanyToObject: ({ objectId, userAdder, userAdded }) => {
    return new Promise(resolve => {
      const request = new AddCompanyToObjectRequest();
      request.setObjectId(objectId);
      request.setAdderUsername(userAdder);
      request.setUsernameAdded(userAdded);

      client.addCompanyToObject(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  RemoveCompanyInObject: ({objectId, company}) => {
    return new Promise(resolve => {
      const request = new RemoveCompanyInObjectRequest();
      request.setObjectId(objectId);
      const com = new Company();
      com.setUsername(company.username);
      com.setCompanyName(company.companyName);
      com.setRole(company.role);
      request.setCompany(com);
      client.removeCompanyInObject(request, {}, (err, response) => {
        resolve({ err, response });
      })
    })
  },
  GetAllCompaniesInObject: (objectId) => {
    return new Promise(resolve => {
      const request = new GetAllCompaniesInObjectRequest();
      request.setObjectId(objectId);

      client.getAllCompaniesInObject(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  UpdateObjectVersion: ({ objectId, username, name, version }) => {
    return new Promise(resolve => {
      const request = new UpdateObjectVersionRequest();
      request.setObjectId(objectId);
      request.setUsername(username);
      request.setUpdatedName(name);
      request.setUpdatedVersion(version);

      client.updateObjectVersion(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  ApproveObjectVersion: ({ objectId, username }) => {
    return new Promise(resolve => {
      const request = new ApproveObjectVersionRequest();
      request.setObjectId(objectId);
      request.setUsername(username);

      client.approveObjectVersion(request, {}, (err, response) => {
        if (err) return resolve({ err, response });
        resolve({ err, response: response.toObject() });
      })
    })
  },
  DeleteObject: (objectId) => {
    return new Promise(resolve => {
      const request = new DeleteObjectRequest();
      request.setObjectId(objectId);
      console.log(request);

      client.deleteObject(request, {}, (err, response) => {
        console.log(err,response);
        resolve({ err, response });
      })
    })
  }
}