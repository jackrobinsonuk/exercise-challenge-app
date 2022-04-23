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
    results: [
      {
        userId: "fleiwusbe",
        rank: 1,
        name: "Jack",
        points: 1223,
        tierPoints: 2,
      },
      {
        userId: "souef",
        rank: 2,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 3,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 4,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
    ],
  },
  {
    leagueName: "Champ League",
    leagueRank: 2,
    results: [
      {
        userId: "fleiwusbe",
        rank: 1,
        name: "Jack",
        points: 1223,
        tierPoints: 2,
      },
      {
        userId: "souef",
        rank: 2,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 3,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 4,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
    ],
  },
  {
    leagueName: "League 1",
    leagueRank: 3,
    results: [
      {
        userId: "fleiwusbe",
        rank: 1,
        name: "Jack",
        points: 1223,
        tierPoints: 2,
      },
      {
        userId: "souef",
        rank: 2,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 3,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 4,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
    ],
  },
  {
    leagueName: "League 2",
    leagueRank: 4,
    results: [
      {
        userId: "fleiwusbe",
        rank: 1,
        name: "Jack",
        points: 1223,
        tierPoints: 2,
      },
      {
        userId: "souef",
        rank: 2,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 3,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
      {
        userId: "souef",
        rank: 4,
        name: "Fred",
        points: 122,
        tierPoints: 0,
      },
    ],
  },
];

async function getWeekNumber() {}

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

exports.generateLeagueHandler = async (event) => {
  const objectType = "application/json"; // type of file
  const challengeId = event.challengeId;
  const weekIndex = event.weekIndex;

  console.info("received:", event);

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
    response: "Successfully Created / Updated League",
  };
  return response;
};
