import { getBucket, client } from "$lib/aws.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function load({}) {
  const bucket = await getBucket();
  //   console.log(bucket);
  console.log("bucket", bucket);
  return { bucket };
}

export const actions = {
  upload: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title");

    // Loop through each file in the formData
    for (const file of data.getAll("file")) {
      let fileContent = await file.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: "izacbucket",
        Key: title + "---" + file.name,
        Body: fileContent,
      });

      try {
        const response = await client.send(command);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
