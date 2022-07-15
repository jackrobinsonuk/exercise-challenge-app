let AWS = require("aws-sdk");
const lambda = new AWS.Lambda({ region: "eu-west-1" });
const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider({
  region: "eu-west-1",
});

exports.updateUserHandler = async (event) => {
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
    const userAttributes = item.UserAttributes;
    const username = item.Username;
    const userPoolId = item.UserPoolId;

    const params = {
      UserAttributes: userAttributes,
      Username: username,
      UserPoolId: userPoolId,
    };

    const data = cognitoIdentityService
      .adminUpdateUserAttributes(params)
      .promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Headers": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "POST",
      },
      isBase64Encoded: false,
    };

    return response;
  } catch (error) {
    console.log("Error:", error);
    const response = {
      statusCode: 500,
      body: JSON.parse(error),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "POST",
      },
      isBase64Encoded: false,
    };
    return response;
  }
};
