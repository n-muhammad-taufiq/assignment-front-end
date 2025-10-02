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
    try {
      const url='https://tectraclinic.onrender.com/login'
      const options={
        headers:{
          'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(loginDetails),
        credentials:"include"
      }
      const responseObj=await fetch('https://tectraclinic.onrender.com/login',{
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
    } catch (error) {
      console.log(error);
    }
  }

  const saveToSessionStorage=(key,value)=>{
    sessionStorage.setItem(key,JSON.stringify(value));
  }

  const refreshToken=async()=>{
    try{
    const responseObj=await fetch('https://tectraclinic.onrender.com/refreshToken',{
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
    return response.data.accessToken;
    }
    catch(error){
      throw error;
    }
  }

  const fetchWithAuth=async(url,options={})=>{
      let token=accessToken;
      options.headers={...options.headers,
      'Authorization':`Bearer ${token}`
      }
      let responseObj;
      try{
          responseObj=await fetch(url,options);
          if(responseObj.status===403){
            try{
                token=await refreshToken();
            }
            catch(error){
              console.log(error);
            }
            options.headers['Authorization']=`Bearer ${token}`;
            responseObj=await fetch(url,options);
          }
      }
      catch(error){
          throw error;
      }
      return responseObj;
  };


  /*For simplicity,login logic is placed here;For production move this logic to seperate login component that
  collect real user input and call the login method by using useContext.
  */

  useEffect(()=>{
    login({emailAddress:'dhanush@gmail.com',password:'test_password'});
  },[]);


  return (
    <AuthContext.Provider value={{login,userData,fetchWithAuth}}>
      {children}
    </AuthContext.Provider>
  )
}



export default AuthProvider;
