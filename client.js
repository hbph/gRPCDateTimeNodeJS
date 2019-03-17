let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
const REMOTE_SERVER = '127.0.0.1:50051';

//Load the proto and create the client instance
protoLoader.load('dateTime.proto', { includeDirs: ['./src'] })
  .then((packageDefinition) => {
    const proto = grpc.loadPackageDefinition(packageDefinition);
    let client = new proto.demo.grpc.DateTime(
      REMOTE_SERVER,
      grpc.credentials.createInsecure()
    );
    // call the function
    client.getCurrentDateTime({}, function (err, res) {
      if (err) {
        //error out if any
        return console.log(err);
      }
      // return the current date and time
      return console.log(res.value);
    });

  });
