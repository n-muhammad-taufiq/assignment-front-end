import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const ProtectedLayout = () => {
  return (
    <div className='flex'>
      <Sidebar></Sidebar>
      <div className='flex flex-col gap-y-5 w-full'>
      <Header></Header>
      <Outlet></Outlet>
      </div>
    </div> 
  )
}

export default ProtectedLayout
