// import entire SDK
import AWS from "aws-sdk";
import "dotenv/config";
import fs from "fs";

const bucketName = process.env.S3_BUCKET;
const region = process.env.S3_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

let s3;
if (process.env.MINIO_URL) {
  s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    endpoint: process.env.MINIO_URL,
    s3ForcePathStyle: "true", // needed with minio?
    signatureVersion: "v4",
  });
} else {
  s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
  });
}

export const uploadFile = async (files) => {
  const params = Object.values(files).map((file) => {
    return {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
      size: file.size,
    };
  });

  const data = await Promise.all(
    params?.map((param) => s3.upload(param).promise())
  );
  return data;
};

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};
