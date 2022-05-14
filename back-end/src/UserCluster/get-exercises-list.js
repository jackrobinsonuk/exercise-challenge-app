const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const bucketName = process.env.EXERCISE_LIST_BUCKET;

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.getExercisesListHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getAllItems only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);

  // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
  try {
    const params = {
      Bucket: bucketName,
      Key: "exercise-list.json",
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
