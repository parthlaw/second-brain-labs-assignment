import bcrypt from "bcrypt"
import { UnIdentifiedError } from "../../types/error"
export const encryptString=async(password:string):Promise<string>=>{
  try{
    return bcrypt.hash(password,10)
  }catch(err){
    console.log(err)
    throw new UnIdentifiedError("Failed to hash password","encryptString")
  }
}
export const checkHash=(password:string,hash:string):Promise<boolean>=>{
  try{
    return bcrypt.compare(password,hash)
  }catch(err){
    throw new UnIdentifiedError("Failed to compare password","checkHash")
  }
}
