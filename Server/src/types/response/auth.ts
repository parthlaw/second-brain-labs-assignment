import { UserResponse } from './user'

export interface LoginResponse extends UserResponse {
  accessToken: {
    token: string
    exp: string
  }
}
