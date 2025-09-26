import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const ProtectedRoute = () => {
    const {userData}=useContext(AuthContext);
    
    if(userData){
    return Children;
    }
}

export default ProtectedRoute
