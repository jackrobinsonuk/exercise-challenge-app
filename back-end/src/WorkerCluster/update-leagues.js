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
const { TemporaryCredentials } = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "eu-west-1" });
const s3 = new AWS.S3();

const initialLeague = require("../Static/initial-league.json");

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
  console.log("Last weeks league data");
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
    return (
      new Date(exercise.date) >= getDateAWeekAgo() &&
      new Date(exercise.date) <= getTodaysDate()
    );
  });

  var dataToReturn = {
    currentWeekExercises: currentWeekExercises,
    lastWeekLeagueData: getLastWeeksLeagueData.body,
  };
  console.log(dataToReturn);

  return dataToReturn;
}

async function updateTotalPointsPerUser(params) {
  const data = params;

  const currentWeekExercises = data.currentWeekExercises;
  const lastWeekLeagueData = data.lastWeekLeagueData;

  const pointsPerId = Array.from(
    currentWeekExercises.reduce((a, { userId, points }) => {
      return a.set(userId, (a.get(userId) || 0) + points);
    }, new Map())
  ).map(([userId, sum]) => ({
    userId,
    sum,
  }));

  var dataToReturn = {
    lastWeekLeagueData: lastWeekLeagueData,
    currentWeekExercises: currentWeekExercises,
    pointsPerId: pointsPerId,
  };

  console.log(dataToReturn);

  return dataToReturn;
}

async function constructNewLeague(params) {
  const data = params;
  const currentWeekExercises = data.currentWeekExercises;
  const lastWeekLeagueData = data.lastWeekLeagueData;
  const pointsPerId = data.pointsPerId;

  async function sortArrayByPoints(pointsPerId) {
    const sortedArrayByPoints = pointsPerId.sort((a, b) =>
      a.sum < b.sum ? 1 : -1
    );
    return sortedArrayByPoints;
  }

  async function splitSortedArrayIntoLeagueRanks(sortedArrayByPoints, parts) {
    const sortedArrayIntoLeagueRanks = [];
    for (let i = parts; i > 0; i--) {
      sortedArrayIntoLeagueRanks.push(
        sortedArrayByPoints.splice(0, Math.ceil(sortedArrayByPoints.length / i))
      );
    }
    return sortedArrayIntoLeagueRanks;
  }

  async function mapUpdatedPointsIntoLeague() {}

  if (lastWeekLeagueData === initialLeague) {
    // If last weeks data is the same as the initial league data

    const updatedLeagues = await sortArrayByPoints(pointsPerId)
      .then((sortedArrayByPoints) =>
        splitSortedArrayIntoLeagueRanks(sortedArrayByPoints, 5)
      )
      .then(
        (sortedArrayIntoLeagueRanks) => console.log(sortedArrayIntoLeagueRanks)
        // This should add each array to the relevant league object based on index + 1
      );

    const dataToReturn = {
      updatedLeagues: updatedLeagues,
      currentWeekExercises: currentWeekExercises,
      lastWeekLeagueData: lastWeekLeagueData,
    };

    return dataToReturn;
  } else {
    // If the last week needs re-writing and updating
    console.log("rewrite league points per UUID and reorder");
    const updatedLeagues = await mapUpdatedPointsIntoLeague();

    // For each league in the league array search the results array
    // When it finds the UUID, update the points they have

    const dataToReturn = {
      updatedLeagues: updatedLeagues,
      currentWeekExercises: currentWeekExercises,
      lastWeekLeagueData: lastWeekLeagueData,
    };

    return dataToReturn;
  }
}

async function updateLeagueWithTierPoints(params) {
  console.log("Update League with Tier Points");
  // There is now an array of leagues which have been updated or inititalised
  // This should add the relevant Tier points to each user based on their position in each league
}

async function handlePromotionAndRelegation(params) {
  console.log("Handled promotions and relegations");

  // We now have an array of leagues with tier points
  // Handle promotions and relegations based on each league
}

async function addLeagueDataToCurrentWeek(params) {
  console.log("Updated league bucket with current week data");

  // Update the league bucket with a new object for league data
}

exports.updateLeagueHandler = async (event) => {
  console.info("received:", event);

  // This will fetch and update the league
  // Get data from S3 for weekIndex - 1

  const result = await getLastWeeksLeagueData(event)
    // Grab data from the DynamoDB for user exercise for the past week
    .then((params) => getUserExerciseForThePastWeek(params))

    // Update the total points per user based on their UUID
    .then((params) => updateTotalPointsPerUser(params))

    // Construct the order in each league
    .then((params) => constructNewLeague(params))

    // Update the league each league with Tier points
    .then((params) => updateLeagueWithTierPoints(params))

    // Handle promotion & relegation
    .then((params) => handlePromotionAndRelegation(params))

    // Put the new league data back with the current weekIndex
    .then((params) => addLeagueDataToCurrentWeek(params));

  return result;
};
