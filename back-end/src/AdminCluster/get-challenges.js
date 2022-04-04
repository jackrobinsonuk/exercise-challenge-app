const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const bucketName = process.env.CHALLENGE_BUCKET;

exports.getChallengesHandler = async (event, context, callback) => {
  /*
 HANDLE DATA WHICH ARE SENT FROM CLINT APP.
 HERE I JUST ADD STATIC DATA 
*/

  const body = JSON.parse(event.body);
  const s3Bucket = bucketName; // replace with your bucket name

  try {
    // setup params for putObject
    const params = {
      Bucket: s3Bucket,
      MaxKeys: 1000,
    };
    const result = await s3.listObjectsV2(params).promise();
    console.log("Success");
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Contents),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST & OPTIONS request
      },
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 404,
      body: JSON.stringify(error),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST & OPTIONS request
      },
    };
    return response;
  }
};
