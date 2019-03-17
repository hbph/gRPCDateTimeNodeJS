const grpc = require('grpc')
const notesProto = grpc.load('dateTime.proto')
const loader = require('@grpc/proto-loader');
const server = new grpc.Server();
var today = new Date();
const dateTimeJson = { value: today};

class TodoAppHandler {
  getCurrentDateTime(_, callback) {
    return callback(null, dateTimeJson);
  }
}

const PATH = '127.0.0.1:50051';

const createServer = function (bindPath, handler) {
  loader.load('dateTime.proto', { includeDirs: ['./src'] })
     .then((packageDefinition) => {
      const package = grpc.loadPackageDefinition(packageDefinition);
      //const service = notesProto.DateTime.service;
      const service = package.demo.grpc.DateTime.service;
      const server = new grpc.Server();
      server.addService(service, handler);
      server.bind(bindPath, grpc.ServerCredentials.createInsecure());
      server.start();
      console.log('Server running on 50051');
    });
}

createServer(PATH, new TodoAppHandler);
