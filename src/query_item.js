
const AWS = require("aws-sdk");
const to_bucket_id = require("./degree_to_bucketId.js");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
 const params = {
	 TableName: "GeoMsg",
	 KeyConditionExpression: "msgType = :msgType and begins_with(bucketId_timestamp, :bucketId_timestamp)",
	 ExpressionAttributeValues: {
         ":msgType": "txt"
     },
     Limit: 3,
     ScanIndexForward: false
	//	 ":C1": "[26686,103847]", // UL: up left corner
     //    ":C2": "[25575,105664]"
		 //":DR": 0  // DR: down right corner
	// }
};
/*
var params = {
  RequestItems: {
    'GeoMsg': {
      Keys: [
        {'coordinate': {N: 'KEY_VALUE_1'}},
        {'KEY_NAME': {N: 'KEY_VALUE_2'}},
        {'KEY_NAME': {N: 'KEY_VALUE_3'}}
      ]
    }
  }
};
*/

module.exports = function(event, context) {
    if (typeof event.range === 'undefined') {
        throw Error("Bad parameter, no range");
    }
    if (typeof event.latitude === 'undefined') {
        throw Error("Bad parameter, no latitude");
    }
    if (typeof event.longtitude === 'undefined') {
        throw Error("Bad parameter, no longtitude");
    }
    const latitude = event.latitude;
    const longtitude = event.longtitude;
    const range = event.range;
    return new Promise((resolve, reject) => {
        const bId = to_bucket_id(latitude, longtitude);
        params.ExpressionAttributeValues[':msgType'] = 'simple1';
        //params.ExpressionAttributeValues[':bucketId_timestamp'] = '00201012232';
        //params.ExpressionAttributeValues[':bucketId_timestamp'] = '00201012';
        params.ExpressionAttributeValues[':bucketId_timestamp'] = '00';

        dynamodb.query(params, function(err, data) {
            console.log("query done");
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
