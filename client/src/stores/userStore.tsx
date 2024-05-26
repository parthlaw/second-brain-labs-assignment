import {create} from 'zustand'

const useUserStore=create((set)=>({
  user: {},
  setUser: (newUser:any)=> set({user:newUser})
}))
export default useUserStore
