/**
 * @fileoverview gRPC-Web generated client stub for services
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.16.3
// source: src/proto/object_service.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var src_proto_company_pb = require('../../src/proto/company_pb.js')
const proto = {};
proto.services = require('./object_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.services.ObjectServceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.services.ObjectServcePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetAllObjectsInProjectForUserRequest,
 *   !proto.services.GetAllObjectsInProjectForUserResponse>}
 */
const methodDescriptor_ObjectServce_GetAllObjectsInProjectForUser = new grpc.web.MethodDescriptor(
  '/services.ObjectServce/GetAllObjectsInProjectForUser',
  grpc.web.MethodType.UNARY,
  proto.services.GetAllObjectsInProjectForUserRequest,
  proto.services.GetAllObjectsInProjectForUserResponse,
  /**
   * @param {!proto.services.GetAllObjectsInProjectForUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetAllObjectsInProjectForUserResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetAllObjectsInProjectForUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.services.GetAllObjectsInProjectForUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetAllObjectsInProjectForUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ObjectServceClient.prototype.getAllObjectsInProjectForUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ObjectServce/GetAllObjectsInProjectForUser',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_GetAllObjectsInProjectForUser,
      callback);
};


/**
 * @param {!proto.services.GetAllObjectsInProjectForUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetAllObjectsInProjectForUserResponse>}
 *     Promise that resolves to the response
 */
proto.services.ObjectServcePromiseClient.prototype.getAllObjectsInProjectForUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ObjectServce/GetAllObjectsInProjectForUser',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_GetAllObjectsInProjectForUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.AddCompanyToObjectRequest,
 *   !proto.services.AddCompanyToObjectResponse>}
 */
const methodDescriptor_ObjectServce_AddCompanyToObject = new grpc.web.MethodDescriptor(
  '/services.ObjectServce/AddCompanyToObject',
  grpc.web.MethodType.UNARY,
  proto.services.AddCompanyToObjectRequest,
  proto.services.AddCompanyToObjectResponse,
  /**
   * @param {!proto.services.AddCompanyToObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.AddCompanyToObjectResponse.deserializeBinary
);


/**
 * @param {!proto.services.AddCompanyToObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.services.AddCompanyToObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.AddCompanyToObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ObjectServceClient.prototype.addCompanyToObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ObjectServce/AddCompanyToObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_AddCompanyToObject,
      callback);
};


/**
 * @param {!proto.services.AddCompanyToObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.AddCompanyToObjectResponse>}
 *     Promise that resolves to the response
 */
proto.services.ObjectServcePromiseClient.prototype.addCompanyToObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ObjectServce/AddCompanyToObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_AddCompanyToObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.RemoveCompanyInObjectRequest,
 *   !proto.services.RemoveCompanyInObjectResponse>}
 */
const methodDescriptor_ObjectServce_RemoveCompanyInObject = new grpc.web.MethodDescriptor(
  '/services.ObjectServce/RemoveCompanyInObject',
  grpc.web.MethodType.UNARY,
  proto.services.RemoveCompanyInObjectRequest,
  proto.services.RemoveCompanyInObjectResponse,
  /**
   * @param {!proto.services.RemoveCompanyInObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.RemoveCompanyInObjectResponse.deserializeBinary
);


/**
 * @param {!proto.services.RemoveCompanyInObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.services.RemoveCompanyInObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.RemoveCompanyInObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ObjectServceClient.prototype.removeCompanyInObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ObjectServce/RemoveCompanyInObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_RemoveCompanyInObject,
      callback);
};


/**
 * @param {!proto.services.RemoveCompanyInObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.RemoveCompanyInObjectResponse>}
 *     Promise that resolves to the response
 */
proto.services.ObjectServcePromiseClient.prototype.removeCompanyInObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ObjectServce/RemoveCompanyInObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_RemoveCompanyInObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.DeleteObjectRequest,
 *   !proto.services.DeleteObjectResponse>}
 */
const methodDescriptor_ObjectServce_DeleteObject = new grpc.web.MethodDescriptor(
  '/services.ObjectServce/DeleteObject',
  grpc.web.MethodType.UNARY,
  proto.services.DeleteObjectRequest,
  proto.services.DeleteObjectResponse,
  /**
   * @param {!proto.services.DeleteObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.DeleteObjectResponse.deserializeBinary
);


/**
 * @param {!proto.services.DeleteObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.services.DeleteObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.DeleteObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ObjectServceClient.prototype.deleteObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ObjectServce/DeleteObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_DeleteObject,
      callback);
};


/**
 * @param {!proto.services.DeleteObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.DeleteObjectResponse>}
 *     Promise that resolves to the response
 */
proto.services.ObjectServcePromiseClient.prototype.deleteObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ObjectServce/DeleteObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_DeleteObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.GetAllCompaniesInObjectRequest,
 *   !proto.services.GetAllCompaniesInObjectResponse>}
 */
const methodDescriptor_ObjectServce_GetAllCompaniesInObject = new grpc.web.MethodDescriptor(
  '/services.ObjectServce/GetAllCompaniesInObject',
  grpc.web.MethodType.UNARY,
  proto.services.GetAllCompaniesInObjectRequest,
  proto.services.GetAllCompaniesInObjectResponse,
  /**
   * @param {!proto.services.GetAllCompaniesInObjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.GetAllCompaniesInObjectResponse.deserializeBinary
);


/**
 * @param {!proto.services.GetAllCompaniesInObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.services.GetAllCompaniesInObjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.GetAllCompaniesInObjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ObjectServceClient.prototype.getAllCompaniesInObject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ObjectServce/GetAllCompaniesInObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_GetAllCompaniesInObject,
      callback);
};


/**
 * @param {!proto.services.GetAllCompaniesInObjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.GetAllCompaniesInObjectResponse>}
 *     Promise that resolves to the response
 */
proto.services.ObjectServcePromiseClient.prototype.getAllCompaniesInObject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ObjectServce/GetAllCompaniesInObject',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_GetAllCompaniesInObject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.UpdateObjectVersionRequest,
 *   !proto.services.UpdateObjectVersionResponse>}
 */
const methodDescriptor_ObjectServce_UpdateObjectVersion = new grpc.web.MethodDescriptor(
  '/services.ObjectServce/UpdateObjectVersion',
  grpc.web.MethodType.UNARY,
  proto.services.UpdateObjectVersionRequest,
  proto.services.UpdateObjectVersionResponse,
  /**
   * @param {!proto.services.UpdateObjectVersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.UpdateObjectVersionResponse.deserializeBinary
);


/**
 * @param {!proto.services.UpdateObjectVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.services.UpdateObjectVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.UpdateObjectVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ObjectServceClient.prototype.updateObjectVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ObjectServce/UpdateObjectVersion',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_UpdateObjectVersion,
      callback);
};


/**
 * @param {!proto.services.UpdateObjectVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.UpdateObjectVersionResponse>}
 *     Promise that resolves to the response
 */
proto.services.ObjectServcePromiseClient.prototype.updateObjectVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ObjectServce/UpdateObjectVersion',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_UpdateObjectVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.services.ApproveObjectVersionRequest,
 *   !proto.services.ApproveObjectVersionResponse>}
 */
const methodDescriptor_ObjectServce_ApproveObjectVersion = new grpc.web.MethodDescriptor(
  '/services.ObjectServce/ApproveObjectVersion',
  grpc.web.MethodType.UNARY,
  proto.services.ApproveObjectVersionRequest,
  proto.services.ApproveObjectVersionResponse,
  /**
   * @param {!proto.services.ApproveObjectVersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.services.ApproveObjectVersionResponse.deserializeBinary
);


/**
 * @param {!proto.services.ApproveObjectVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.services.ApproveObjectVersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.services.ApproveObjectVersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.services.ObjectServceClient.prototype.approveObjectVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/services.ObjectServce/ApproveObjectVersion',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_ApproveObjectVersion,
      callback);
};


/**
 * @param {!proto.services.ApproveObjectVersionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.services.ApproveObjectVersionResponse>}
 *     Promise that resolves to the response
 */
proto.services.ObjectServcePromiseClient.prototype.approveObjectVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/services.ObjectServce/ApproveObjectVersion',
      request,
      metadata || {},
      methodDescriptor_ObjectServce_ApproveObjectVersion);
};


module.exports = proto.services;

