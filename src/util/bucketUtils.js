import AWS from "aws-sdk";

const config = {
  endpoint: process.env.REACT_APP_BUCKET_ENDPOINT,
  accessKeyId: process.env.REACT_APP_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_BUCKET_SECRET_KEY,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
};

AWS.config.update(config);

const s3 = new AWS.S3();

export async function getBucketObject(itemKey) {
  const params = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Key: itemKey,
  };

  try {
    // Call the getObject method to retrieve the object
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
