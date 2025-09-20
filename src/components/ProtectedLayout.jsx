import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  return (
    <div className='flex'>
      <Sidebar></Sidebar>
      <div className='flex flex-col'>
      <Outlet></Outlet>
      </div>
    </div> 
  )
}

export default ProtectedLayout
