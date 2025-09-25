import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const ProtectedLayout = () => {
  return (
    <div className='flex min-h-screen overflow-hidden '>
      <Sidebar></Sidebar>
      <div className='flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden bg-gray-100 hide-scrollbar'>
      <Header></Header>
      <Outlet></Outlet>
      </div>
    </div> 
  )
}

export default ProtectedLayout
