import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Loading from './Loading';

const ProtectedRoute = ({children}) => {
    const {userData}=useContext(AuthContext);

    if(!userData){
        return <Loading></Loading>
    }

    return children;
    
}

export default ProtectedRoute
