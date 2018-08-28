
const AWS = require("aws-sdk");
const crypto = require("crypto");
const to_bucket_id = require("./degree_to_bucketId.js");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const toContentHash = function(o) {
    const content = o.content || "";
    const timestamp = o.timestamp || "";
    const latitude = o.latitude || "";
    const longtitude = o.longtitude || "";
    const version = o.version || "";

    const s = content + timestamp + latitude + longtitude + version;
    console.log("s:" + s);
    const code = crypto.createHash('sha1').update(s).digest("hex");
    console.log("code:" + code);
    return code;
}

const getParamsV1 = function(content, latitude, longtitude) {
    const timestamp = Math.floor(new Date());

    var bucketId = to_bucket_id(latitude, longtitude);
    var params = {
        TableName : "GeoMsg",
        Item: {
            version: 1,
            msgType: 'simple1',
            content: content,
            latitude: latitude,
            longtitude: longtitude
        }
    };
    const hash = toContentHash(params.Item);
    params.Item.bucketId_timestamp = bucketId + '_' + timestamp + '_' + hash;

    return params;
}

module.exports = function(event, context) {
    if (typeof event.content === 'undefined') {
        throw Error("Bad parameter, no content");
    }
    if (typeof event.latitude === 'undefined') {
        throw Error("Bad parameter, no latitude");
    }
    if (typeof event.longtitude === 'undefined') {
        throw Error("Bad parameter, no longtitude");
    }
    const content = event.content;
    const latitude = event.latitude;
    const longtitude = event.longtitude;

    const params = getParamsV1(content, latitude, longtitude);
    return new Promise((resolve, reject) => {
        dynamodb.put(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
