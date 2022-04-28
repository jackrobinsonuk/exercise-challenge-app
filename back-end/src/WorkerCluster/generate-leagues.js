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

let AWS = require("aws-sdk");
const s3 = new AWS.S3();

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

exports.generateLeagueHandler = async (event) => {
  console.info("received:", event);

  const objectType = "application/json"; // type of file
  const challengeId = event.challengeId;
  const weekIndex = event.weekIndex;

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
};
