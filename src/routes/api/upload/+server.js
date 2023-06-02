import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// AWS S3 bucket details
const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIA6KROKWA5OYBSVYTN",
    secretAccessKey: "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",
  },
});

export async function POST(request) {
  const file = request.body.get("file");
  const fileContent = await file.arrayBuffer();
  const params = {
    Bucket: bucketName,
    Key: file.filename,
    Body: fileContent,
  };

  try {
    const command = new PutObjectCommand(params);
    await client.send(command);
    return {
      status: 200,
      body: {
        message: "File uploaded successfully",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: {
        error: "Failed to upload file",
      },
    };
  }
}
