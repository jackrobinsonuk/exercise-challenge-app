const https = require("https");
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
let AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "eu-west-1" });

// Get the DynamoDB table name from environment variables
const tableName = process.env.USER_EXERCISE_TABLE;

function getExerciseList() {
  // Call another API to get the list of possible exercises
  // Return the list

  const url =
    "https://pu3iwm6kxc.execute-api.eu-west-1.amazonaws.com/Prod/user/get-exercises-list";

  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let rawData = "";

      res.on("data", (chunk) => {
        rawData += chunk;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(err));
    });
  });
}

function calculateTotalPoints() {
  // Calculate how many points the user earned based on the exerciseId, the points that adds per minute and the number of minutes they exercised
  // Get the list of exercises from the other table
  // Find the exercise the user completed from the list
  // Multiply the number of points the exercise is worth by the number of minutes exercised
  // Update the payload
  // Add the payload to the DB
}

function addExerciseName() {
  // Add the exercise name to the item based on the exerciseId
  // Get the list of exercises from the other table
  // Lookup the exerciseName based on exerciseId
  // Update the payload
  // Add the payload to the DB
}

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.addExerciseHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);

  // Get id and name from the body of the request
  const body = JSON.parse(event.body);
  const exerciseId = body.exerciseId;
  const minutesExercised = body.minutesExercised;
  const userId = body.userId;
  const date = body.date;
  const id = AWS.util.uuid.v4();

  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
  var params = {
    TableName: tableName,
    Item: {
      exerciseId: exerciseId,
      minutesExercised: minutesExercised,
      userId: userId,
      date: date,
      id: id,
    },
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
      "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST & OPTIONS request
    },
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
