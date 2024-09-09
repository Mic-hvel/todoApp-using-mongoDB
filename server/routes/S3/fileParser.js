// import entire SDK
import AWS from "aws-sdk";
import "dotenv/config";
import fs from "fs";

const bucketName = process.env.S3_BUCKET;
const region = process.env.S3_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadFile = async (files) => {
  const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
  });

  const params = Object.values(files).map((file) => {
    return {
      Bucket: bucketName,
      Key: `${file[0].name}`,
      Body: file[0].buffer,
      size: file[0].size,
    };
  });

  return await Promise.all(params?.map((param) => s3.upload(param).promise()));
};

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};
