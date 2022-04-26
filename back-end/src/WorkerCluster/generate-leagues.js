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

const https = require("https");
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
let AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "eu-west-1" });
const s3 = new AWS.S3();

const userExerciseTable = process.env.USER_EXERCISE_TABLE;
const exerciseListTable = process.env.EXERCISES_TABLE;
const challengeBucket = process.env.CHALLENGE_BUCKET;
const leagueBucket = process.env.LEAGUE_BUCKET;

const league = [
  {
    leagueName: "Premier League",
    leagueRank: 1,
    results: [],
  },
  {
    leagueName: "Championship",
    leagueRank: 2,
    results: [],
  },
  {
    leagueName: "League 1",
    leagueRank: 3,
    results: [],
  },
  {
    leagueName: "League 2",
    leagueRank: 4,
    results: [],
  },
  {
    leagueName: "Vanorama League",
    leagueRank: 5,
    results: [],
  },
];

function getDateAWeekAgo() {
  var today = new Date();
  var lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  ).toLocaleDateString("en-GB", {
    // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return lastWeek;
}

function getTodaysDate() {
  const date = new Date();

  const result = date.toLocaleDateString("en-GB", {
    // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  var today = result;

  return today;
}

async function constructLeague(event) {
  const body = event.body;
  const challengeId = body.challengeId;

  try {
    const params = {
      Bucket: challengeBucket,
      Key: challengeId,
    };
    const leagues = body.leagues;
    const week = await s3.getObject(params).promise();

    return week;
  } catch (error) {
    console.log(error);
  }
}

async function getLastWeeksLeagueData(event) {
  const previousWeekIndex = event.weekIndex - 1;
  const challengeId = event.challengeId;
  const s3Bucket = leagueBucket;
  console.log("tried to get last weeks league data");
  try {
    const params = {
      Bucket: s3Bucket,
      Key: `${challengeId}-Week${previousWeekIndex}`,
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
    console.log(`Error in last week league data` + error);
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
}

async function getUserExerciseForThePastWeek(params) {
  const getLastWeeksLeagueData = params;
  const tableName = userExerciseTable;

  console.log("Tried to get user exercise");

  var params = {
    TableName: tableName,
  };
  const data = await docClient.scan(params).promise();

  const items = data.Items;

  const currentWeekExercises = items.filter(function (exercise) {
    return getDateAWeekAgo() < exercise.date < getTodaysDate();
  });

  const dataToReturn = {
    currentWeekExercises: currentWeekExercises,
    lastWeekLeagueData: getLastWeeksLeagueData,
  };

  return dataToReturn;
}

async function updateTotalPointsPerUser(params) {
  const data = params;

  const currentWeekExercises = data.currentWeekExercises;
  const lastWeekLeagueData = data.lastWeekLeagueData;

  console.log(`CurrentWeekExercises` + currentWeekExercises);
  console.log(`LastWeekLeagueData` + lastWeekLeagueData);
}

async function updateLeagueWithTierPoints(params) {
  console.log("Update League with Tier Points");
}

async function addLeagueDataToCurrentWeek(params) {
  console.log("Updated league bucket with current week data");
}

exports.generateLeagueHandler = async (event) => {
  console.info("received:", event);

  const objectType = "application/json"; // type of file
  const challengeId = event.challengeId;
  const weekIndex = event.weekIndex;

  if (weekIndex === 0) {
    // This will construct the league and should be done when a challenge is created
    const params = {
      Bucket: leagueBucket,
      Key: `${challengeId}-Week${weekIndex}`,
      Body: Buffer.from(JSON.stringify(league)),
      ContentEncoding: "base64",
      ContentType: objectType,
      ACL: "public-read",
    };

    console.log(params);

    const result = await s3.putObject(params).promise();
    console.log(result);

    const response = {
      response: "Successfully Created League",
    };
    return response;
  } else if (weekIndex !== 0) {
    // This will fetch and update the league
    // Get data from S3 for weekIndex - 1

    const result = await getLastWeeksLeagueData(event)
      // Grab data from the DynamoDB for user exercise for the past week
      .then((params) => getUserExerciseForThePastWeek(params))

      // Update the total points per user based on their UUID
      .then((params) => updateTotalPointsPerUser(params))

      // Update the league data with Tier points
      .then((params) => updateLeagueWithTierPoints(params))

      // Put the new league data back with the current weekIndex
      .then((params) => addLeagueDataToCurrentWeek(params));

    return result;
  }
};
