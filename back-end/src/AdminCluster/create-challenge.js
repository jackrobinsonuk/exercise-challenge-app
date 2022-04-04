const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const bucketName = process.env.CHALLENGE_BUCKET;

exports.createChallengeHandler = async (event, context, callback) => {
  /*
 HANDLE DATA WHICH ARE SENT FROM CLINT APP.
 HERE I JUST ADD STATIC DATA 
*/

  const body = JSON.parse(event.body);
  const s3Bucket = bucketName; // replace with your bucket name
  const challengeName = body.challengeName; // File name which you want to put in s3 bucket
  const objectType = "application/json"; // type of file

  var challengeData = {
    challengeName: challengeName,
    challengeId: AWS.util.uuid.v4(),
    data: body.data,
  };

  var buf = Buffer.from(JSON.stringify(challengeData));

  try {
    // setup params for putObject
    const params = {
      Bucket: s3Bucket,
      Key: challengeName,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: objectType,
      ACL: "public-read",
    };
    const result = await s3.putObject(params).promise();
    console.log(
      `File uploaded successfully at https:/` + s3Bucket + `.s3.amazonaws.com/`
    );
    const response = {
      statusCode: 201,
      body: JSON.stringify({ result, body }),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST & OPTIONS request
      },
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 404,
      body: JSON.stringify(error),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST & OPTIONS request
      },
    };
    return response;
  }
};
