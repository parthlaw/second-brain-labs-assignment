import { getUploadFileURL } from '../../utils/aws/s3'

const upload: Controller<any> = async (req, res, next) => {
  try {
    const name = req.query.name as string
    const url = await getUploadFileURL('pdfs', name)
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
export default upload
