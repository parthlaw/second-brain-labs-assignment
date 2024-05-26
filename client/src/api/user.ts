import axios from "axios"
import { BASE_API_URL } from "./constants"

export const createNewUser=async(user:any)=>{
  try{
    const data = await axios.post(`${BASE_API_URL}/user`,user)
    return data.data
  }catch(e){
    console.log(e)
    throw e
  }
}

export const login=async(creds:any)=>{
  try{
    const data = await axios.post(`${BASE_API_URL}/auth/login`,creds)
    return data.data
  }catch(err){
    throw err
  }
}
export const getUser=async()=>{
  try{
    const data = await axios.get(`${BASE_API_URL}/user`)
    return data.data
  }catch(err){
    throw err
  }
}
