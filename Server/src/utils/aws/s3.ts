import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
const s3Client = new S3Client({ region: 'ap-south-1' })
export const getUploadFileURL = async (
  bucketName: string,
  objectName: string,
  expiration = 3600
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectName,
    ContentType: 'application/pdf',
  })
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: expiration })
    return url
  } catch (e) {
    console.log(e)
    return null
  }
}

export const createS3UrlFromKey = (bucket: string, key: string): string => {
  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}
