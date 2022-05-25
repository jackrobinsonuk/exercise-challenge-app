const AWS = require("aws-sdk");

const userPoolId = process.env.USER_POOL_ID;
const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider({
  region: "eu-west-1",
});

exports.getUsersHandler = async (event, context) => {
  const params = {
    UserPoolId: userPoolId,
  };

  try {
    const data = await cognitoIdentityService.listUsers(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Headers": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "GET",
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
        "Access-Control-Allow-Methods": "GET",
      },
      isBase64Encoded: false,
    };
    return response;
  }
};
