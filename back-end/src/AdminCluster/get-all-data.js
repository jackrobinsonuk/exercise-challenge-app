const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: process.env.USER_EXERCISE_TABLE,
};

async function listItems() {
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.getAllDataHandler = async (event, context) => {
  try {
    const data = await listItems();
    return { body: JSON.stringify(data) };
  } catch (err) {
    return { error: err };
  }
};
