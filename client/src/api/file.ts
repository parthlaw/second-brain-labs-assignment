import axios from "axios"

export const getPresignedUrl=async()=>{
  try{
    const data = await axios.get("http://localhost:8000/api/file/upload")
    return data.data
  }catch(e){
    console.log(e)
    return null
  }
}
