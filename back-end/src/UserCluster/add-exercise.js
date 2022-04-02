const https = require("https");
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
let AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "eu-west-1" });

// Get the DynamoDB table name from environment variables
const userExerciseTable = process.env.USER_EXERCISE_TABLE;
const exerciseListTable = process.env.EXERCISES_TABLE;

async function calculateTotalPoints(body) {
  // Calculate how many points the user earned based on the exerciseId, the points that adds per minute and the number of minutes they exercised
  // Get the list of exercises from the other table
  // Find the exercise the user completed from the list
  // Multiply the number of points the exercise is worth by the number of minutes exercised
  // Update the payload
  // Add the payload to the DB

  var params = {
    TableName: exerciseListTable,
  };
  const data = await docClient.scan(params).promise();
  const items = data.Items;

  var exercise = await items.find(
    ({ exerciseId }) => exerciseId === body.exerciseId
  );
  console.info(items);
  console.info(exercise.points);

  var totalPoints = exercise.points * body.minutesExercised;
  console.info(totalPoints);

  return totalPoints;
}

async function addExerciseName(body) {
  // Add the exercise name to the item based on the exerciseId
  // Get the list of exercises from the other table
  // Lookup the exerciseName based on exerciseId
  // Update the payload
  // Add the payload to the DB

  var params = {
    TableName: exerciseListTable,
  };
  const data = await docClient.scan(params).promise();
  const items = data.Items;

  var exercise = items.find(({ exerciseId }) => exerciseId === body.exerciseId);
  console.info(items);
  console.info(exercise.exerciseName);
  return exercise.exerciseName;
}

async function constructItem(event) {
  // Get id and name from the body of the request
  const body = JSON.parse(event.body);
  const exerciseId = body.exerciseId;
  const minutesExercised = body.minutesExercised;
  const userId = body.userId;
  const date = body.date;
  const id = AWS.util.uuid.v4();
  const exerciseName = await addExerciseName(body);
  const points = await calculateTotalPoints(body);

  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
  var params = {
    TableName: userExerciseTable,
    Item: {
      exerciseId: exerciseId,
      minutesExercised: minutesExercised,
      userId: userId,
      date: date,
      id: id,
      exerciseName: exerciseName,
      points: points,
    },
  };

  return params;
}

async function pushItemIntoDB(params) {
  const result = await docClient.put(params).promise();
  return result;
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

  const result = await constructItem(event).then((params) =>
    pushItemIntoDB(params)
  );

  const response = {
    statusCode: 200,
    body: "Successfully Written to DB",
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
      "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST & OPTIONS request
    },
  };
  return response;
};
