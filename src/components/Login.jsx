import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const Login = () => {
    const {login}=useContext(AuthContext);
    const [loginDetails,setLoginDetails]=useState({emailAddress:'dhanush@gmail.com',password:'test_password'});
    const [shouldLogin,setShouldLogin]=useState(true);

    useEffect(()=>{
        login(loginDetails);
    },[shouldLogin]);
    
  return (
    <>
    </>
  )
}

export default Login
