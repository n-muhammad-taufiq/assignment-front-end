import React from 'react'
import { createContext } from 'react'

export const AuthContext=createContext();

const AuthProvider = ({children}) => {

  const login=async (loginDetails)=>{
    const data=JSON.stringify(loginDetails)

    try {
      //login details are hardcoded here for simplicity;Replace with 'data' in production
      const responseObj=await fetch('http://localhost:3000/login',{
        headers:{
          'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
        emailAddress:'dhanush@gmail.com', 
        password:'testpassword'
        })
      })
    } catch (error) {
    
    }
  }
  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider;
