import { PreSignedUrlResponse } from '../../types'
import { getUploadFileURL } from '../../utils/aws/s3'

const getPreSignedUrl: Controller<PreSignedUrlResponse> = async (
  req,
  res,
  next
) => {
  try {
    const name = req.query.name as string
    if (!name) {
      return res.status(400).json({
        error: true,
        message: 'Name is required',
      })
    }
    const url = await getUploadFileURL(process.env.BUCKET_NAME, name)
    console.log(url)
    return res.status(201).json({
      success: true,
      message: 'URL generated',
      data: {
        url: url,
      },
    })
  } catch (err) {
    next(err)
  }
}
export default getPreSignedUrl
