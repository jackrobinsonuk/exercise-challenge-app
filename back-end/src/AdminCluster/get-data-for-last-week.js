// This lambda function will update the leagues S3 bucket with the data from the latest week

// Note: this may need doing over multiple functions and use StepFunctons to chain it together

// Find out what week number it is in the challenge
// Get all exercise completed in the week
// Get current league data
// Update current league data with new data from the week (/)
// Re-rank the users based on the league data, ordering by points

// the first user in the rank is added 2 tier points and promoted
// the second user in the rank is added 1 tier point
// the last user in the rank is subtracted 1 tier points and demoted

// the new league data should be saved to the s3 bucket to allow it to be fetched

// Sample League Data (this is what the FE expects) can be found in the FE portion of the repo
// If the service contract cannot be achieved, then the FE UI will need to be redesigned
const axios = require('axios');
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
let AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'eu-west-1' });
const s3 = new AWS.S3();

const userExerciseTable = process.env.USER_EXERCISE_TABLE;
const challengeBucket = process.env.CHALLENGE_BUCKET;
const leagueBucket = process.env.LEAGUE_BUCKET;

function getDateAWeekAgo() {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  return lastWeek;
}

function getTodaysDate() {
  const now = new Date();

  return now;
}

async function getUserExerciseForThePastWeek() {
  const tableName = userExerciseTable;

  console.log('Tried to get user exercise');

  var params = {
    TableName: tableName,
  };
  const data = await docClient.scan(params).promise();

  const items = data.Items;

  const currentWeekExercises = items.filter(function (exercise) {
    return (
      new Date(exercise.date) >= getDateAWeekAgo() &&
      new Date(exercise.date) <= getTodaysDate()
    );
  });

  var dataToReturn = {
    currentWeekExercises: currentWeekExercises,
  };
  console.log(dataToReturn);

  return dataToReturn;
}

async function updateTotalPointsPerUser(params) {
  const data = params;

  const currentWeekExercises = data.currentWeekExercises;

  const pointsPerId = Array.from(
    currentWeekExercises.reduce((a, { userId, points }) => {
      return a.set(userId, (a.get(userId) || 0) + points);
    }, new Map())
  ).map(([userId, sum]) => ({
    userId,
    sum,
  }));

  return pointsPerId;
}

async function lookupUserId(params) {
  const pointsPerId = params;

  const userList = axios
    .get(`${apiRoot}/admin/get-users`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });

  const dataToReturn = {
    pointsPerId: pointsPerId,
    userList: userList,
  };

  return dataToReturn;
}

exports.getDataForLastWeekHandler = async (event) => {
  console.info('received:', event);

  // This will fetch and update the league
  // Get data from S3 for weekIndex - 1

  const result = await getUserExerciseForThePastWeek()
    // Update the total points per user based on their UUID
    .then((params) => updateTotalPointsPerUser(params))

    .then((params) => lookupUserId(params));

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      'Access-Control-Allow-Headers': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow from anywhere
      'Access-Control-Allow-Methods': 'GET', // Allow only POST & OPTIONS request
    },
  };

  return response;
};
