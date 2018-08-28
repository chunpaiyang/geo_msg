
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:4569"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "GeoMsg",
    KeySchema: [
        { AttributeName: "msgType", KeyType: "HASH"},  //Partition key
        { AttributeName: "bucketId_timestamp", KeyType: "RANGE" }  //sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "msgType", AttributeType: "S" },
        { AttributeName: "bucketId_timestamp", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

module.exports = function(event, context) {
    return new Promise((resolve, reject) => {
        dynamodb.createTable(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

