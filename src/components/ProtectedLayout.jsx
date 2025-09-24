import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  return (
    <div className='flex min-h-screen overflow-hidden'>
      <Sidebar></Sidebar>
      <div className='flex flex-col w-full h-screen overflow-auto bg-gray-100 hide-scrollbar'>
      <Outlet></Outlet>
      </div>
    </div> 
  )
}

export default ProtectedLayout
