import dotenv from "dotenv";
dotenv.config();

import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function getBucket() {
  return new Promise(async (resolve, reject) => {
    let urls = [];
    const command = new ListObjectsV2Command({
      Bucket: "izacbucket",
    });

    try {
      let isTruncated = true;

      //   console.log("Your bucket contains the following objects:\n");
      let contents = "";

      while (isTruncated) {
        const { Contents, IsTruncated, NextContinuationToken } = await client.send(command);
        console.log(Contents);
        if (!Contents) {
          resolve([]);
        }
        for (const item of Contents) {
          // Generate a presigned URL for each object
          const getCommand = new GetObjectCommand({
            Bucket: "izacbucket",
            Key: item.Key,
          });
          const url = await getSignedUrl(client, getCommand, { expiresIn: 3600 });
          urls.push({ url: url, key: item.Key });
          contents += ` • ${item.Key} - ${url}\n`;
        }
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      //   console.log(contents);
      console.log(urls);

      resolve(urls);
    } catch (err) {
      console.error(err);
    }
  });
}
