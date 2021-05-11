require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY;
const secretAccessKey = process.env.AWS_S3_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

//  uploads a file to s3

uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const fileName = file.name.toLowerCase().split(" ").join("");

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName
  };

  return s3.upload(uploadParams).promise();
};

// downloads a file from s3
getFileStream = (filekey) => {
  const downloadParams = {
    key: filekey,
    Bucket: bucketName
  };

  return s3.getObject(downloadParams).createReadStream();
};

const s3Actions = { uploadFile, getFileStream };

module.exports = {
  s3Actions
};
