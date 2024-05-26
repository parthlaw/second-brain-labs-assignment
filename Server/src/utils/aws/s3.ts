import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createWriteStream } from 'fs'
const s3Client = new S3Client({ region: 'ap-south-1' })
export const getUploadFileURL = async (
  bucketName: string,
  objectName: string,
  expiration = 3600
) => {
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

export const downloadFromS3 = async (bucketName: string, key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  })
  try {
    const response = await s3Client.send(command)
    const str = await response.Body.transformToString()
    console.log(str)
    return str
  } catch (err) {
    console.error(err)
    return null
  }
}
export const createS3UrlFromKey = (bucket: string, key: string) => {
  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}
