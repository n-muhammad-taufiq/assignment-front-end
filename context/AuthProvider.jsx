import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const AuthContext=createContext();

const AuthProvider = ({children}) => {

  const [userData,setUserData]=useState(()=>{
    return sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : null;
   });

  const [accessToken,setAccessToken]=useState(()=>{
    return sessionStorage.getItem('access_token') ? JSON.parse(sessionStorage.getItem('access_token')) : null;

  })

  const login=async (loginDetails)=>{
    console.log(loginDetails);
    try {
      const responseObj=await fetch('http://localhost:3000/login',{
        headers:{
          'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(loginDetails),
        credentials:"include"
      });
      const response=await responseObj.json();
      setUserData(response.data.user);
      setAccessToken(response.data.accessToken);
      saveToSessionStorage('user_data',response.data.user);
      saveToSessionStorage('access_token',response.data.accessToken);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const saveToSessionStorage=(key,value)=>{
    sessionStorage.setItem(key,JSON.stringify(value));
  }

  const fetchAccessToken=async()=>{
    try{
    const responseObj=await fetch('http://localhost:3000/refreshToken/',{
      headers:{
        'Authorization':`Bearer ${accessToken}`
      },
      credentials:"include"
    }
    );
    const response=await responseObj.json();
    console.log(response);
    setAccessToken(response.data.accessToken);
    saveToSessionStorage('access_token',response.data.accessToken);
    }
    catch(error){
      console.log(error);
    }
  }


  useEffect(()=>{
    if(userData){
    fetchAccessToken();
    }
  },[userData])

  /*For simplicity,login logic is placed here;For production move this logic to seperate login component that
  collect real user input and call the login method by using useContext.
  */

  useEffect(()=>{
    login({emailAddress:'dhanush@gmail.com',password:'test_password'});
  },[]);



  const value={login};

  return (
    <AuthContext.Provider value={{login,userData,accessToken}}>
      {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider;
