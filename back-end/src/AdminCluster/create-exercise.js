const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
let AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "eu-west-1" });

// Get the DynamoDB table name from environment variables
const tableName = process.env.EXERCISES_TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.createExerciseHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);

  // Get id and name from the body of the request

  let promises = [];

  const item = JSON.parse(event.body);

  console.info("received body", item);
  try {
    item.forEach((item) => {
      const id = AWS.util.uuid.v4();
      const exerciseName = item.exerciseName;
      const points = item.points;
      const exerciseId = item.exerciseId;

      const params = {
        TableName: tableName,
        Item: {
          exerciseName: exerciseName,
          points: points,
          exerciseId: exerciseId,
          id: id,
        },
      };
      promises.push(docClient.put(params).promise());
    });

    await Promise.all(promises);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "File Imported",
      }),
    };
  } catch (err) {
    console.log(err);
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: "Unsuccessful - the input was not an array",
      }),
    };
    throw err;
  }

  return response;
};
