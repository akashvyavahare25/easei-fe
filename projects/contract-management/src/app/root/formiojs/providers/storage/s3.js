"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.string.trim");
var env=require("../../../../../../src/environments/environment");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _xhr = _interopRequireDefault(require("./xhr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s3 = function s3(formio) {
  formio.formUrl=env.environment.baseUrl+'/api'
  return {
    uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
      return _xhr.default.upload(formio, 's3', function(xhr, response){
       
        response.fileName = fileName;
        response.key = _xhr.default.path([response.key, dir, fileName]);
        if (response.signed) {
          xhr.openAndSetHeaders('PUT', response.signed);
          xhr.setRequestHeader('Content-Type', file.type);
          return file;
        }
        else {
          const fd = new FormData();
          // for (const key in response.data) {
          //   fd.append(key, response.data[key]);
          // }
          fd.append('file', file);
          xhr.open('PUT', response.url);
         // xhr.open('PUT', env.environment.baseUrl+response.url);
          //xhr.setRequestHeader('Content-Type', file.type);
          xhr.setRequestHeader('Accept', '*/*');
          return fd;
        }
      }, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback).then((response) => {
        return {
          storage: 's3',
          name: fileName,
          bucket: response.bucket,
          key: response.key,
          url: _xhr.default.path([response.url, response.key]),
          acl: response.acl,
          size: file.size,
          type: file.type
        };
      });
    },downloadFile(file) {
      if (file.acl !== 'public-read') {
        return formio.makeRequest('file', `${formio.formUrl}/storage/s3?bucket=${_xhr.trim(file.bucket)}&key=${_xhr.trim(file.key)}`, 'GET');
      }
      else {
        return _nativePromiseOnly.default.resolve(file);
      }
    }
  };
};

s3.title = 'S3';
var _default = s3;
exports.default = _default;