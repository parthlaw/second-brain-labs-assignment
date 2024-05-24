import jwt from "jsonwebtoken";
import { UnIdentifiedError } from "../../types/error";
export const createToken = (refresh: boolean, id: string | number) => {
  try{
  const exp = "168h";

  const token = jwt.sign({ userId: id },process.env.JWT_KEY, { expiresIn: exp });
  const accessToken = { token, exp };
  if (refresh) {
    const refreshToken = jwt.sign({ userId: id }, process.env.JWT_KEY, {expiresIn: "7d"});
    return { accessToken, refreshToken };
  }
  return { accessToken };
  }catch(error){
    throw new UnIdentifiedError("Error in createToken","createToken",error)
  }
};

export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    return data;
  } catch (error) {
    throw new UnIdentifiedError("Error in verifyToken","verifyToken",error)
  }
};
