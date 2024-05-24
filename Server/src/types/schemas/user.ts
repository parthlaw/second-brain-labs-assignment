export interface UserType{
  name: string;
  email:string;
  password:string;
}
interface BaseUser{
  name:string;
  email:string;
}
export interface LoginInput{
  email:string;
  password:string
}
export interface UserInput extends BaseUser{
  password:string;
}
export interface UserOutput extends BaseUser{
  id:string|number
}
