/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
exports.fakeHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `delete exercise only accept DELETE method, you tried: ${event.httpMethod}`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);

  // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html

  const response = {
    statusCode: 200,
    body: JSON.stringify(event.body),
    headers: {
      "Access-Control-Allow-Headers": "application/json",
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
      "Access-Control-Allow-Methods": "POST",
    },
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
