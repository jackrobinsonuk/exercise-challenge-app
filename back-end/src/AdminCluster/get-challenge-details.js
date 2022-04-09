const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const bucketName = process.env.CHALLENGE_BUCKET;

exports.getChallengeDetailsHandler = async (event, context, callback) => {
  const s3Bucket = bucketName;
  const challengeName = event.queryStringParameters.challengeName;

  try {
    const params = {
      Bucket: s3Bucket,
      Key: challengeName,
    };
    const result = await s3.getObject(params).promise();

    const response = {
      statusCode: 200,
      body: result.Body.toString("utf-8"),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "GET", // Allow only POST & OPTIONS request
      },
    };
    console.log(response.body);
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 404,
      body: JSON.stringify(error),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "GET", // Allow only POST & OPTIONS request
      },
    };
    return response;
  }
};
