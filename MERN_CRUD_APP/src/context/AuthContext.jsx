import axios from 'axios';
import Cookies from 'js-cookie';
import {createContext, useEffect, useState} from 'react'
import { AppRoutes } from '../constants/constant';
export const AuthContext = createContext()

export default function AuthContextProvider({children}){
    const [user, setUser] = useState(null)

    useEffect(()=>{
      if(!user){
        const token = Cookies.get("token")
           if(token){
           getUser()
      }
      }
   
    },[user])

    const getUser = ()=>{
      axios.get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        },
      }).then((res)=>{
        console.log("response from get my info API=> ", res.data)
        setUser(res.data.data)
      }).catch((err=>{
        console.log("error form authcontext while fetching user", err)
      }))
    }
  return  (
    <AuthContext.Provider value={{user, setUser}}> 
     {children} 
    </AuthContext.Provider>
  )
    
}