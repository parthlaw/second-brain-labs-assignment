import axios from 'axios'
import { BASE_API_URL } from './constants'

export async function getPresignedUrl(apiData: any): Promise<any> {
  try {
    const data = await axios.get(
      `${BASE_API_URL}/file/getPreSignedUrl?name=${apiData.name}`,
      {
        headers: {
          Authorization: apiData.token,
        },
      }
    )
    return data.data
  } catch (e) {
    console.log(e)
    return null
  }
}
