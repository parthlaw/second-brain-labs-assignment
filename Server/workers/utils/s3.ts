import AWS from "aws-sdk"
import {createWriteStream} from "fs"
const s3 = new AWS.S3()
export const downloadFromS3 = (bucketName: string, key: string, destinationPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const fileStream = s3.getObject({
        Bucket: bucketName,
        Key: key
      }).createReadStream();

      const writeStream = createWriteStream(destinationPath);

      fileStream.pipe(writeStream);

      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      fileStream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};
