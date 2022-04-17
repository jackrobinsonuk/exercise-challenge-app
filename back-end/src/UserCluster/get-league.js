// fetch data from the S3 bucket with the league data in
// return it to the user
// query by week number

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const bucketName = process.env.LEAGUE_BUCKET;

exports.getLeagueHandler = async (event, context, callback) => {
  const s3Bucket = bucketName;
  const weekIndex = event.queryStringParameters.weekIndex;
  const challengeName = event.queryStringParameters.challengeName;

  try {
    const params = {
      Bucket: s3Bucket,
      Key: `${challengeName}-Week ${weekIndex}`,
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
