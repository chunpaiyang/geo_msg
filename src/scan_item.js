
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName : "GeoMsg"
};

module.exports = function(event, context) {
    return new Promise((resolve, reject) => {
        dynamodb.scan(params, function(err, data) {
            console.log("scan done");
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
