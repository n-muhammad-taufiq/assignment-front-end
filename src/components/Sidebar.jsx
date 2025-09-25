import React, { useState } from 'react'

const Sidebar = () => {



  return (
    <>
    <div className='flex flex-col h-screen border-r-2 border-r-gray-200 bg-slate-50 pt-5  pr-3 gap-y-7 pl-4 max-lg:hidden w-fit '>
      <div className='flex flex-col gap-y-5 '>
            <div className='flex gap-x-1 items-center'>
              <img className='h-7 w-fit' src="./src/assets/icons/tectra_technologies_logo.png" alt="" />
              <h1 className='font-black text-base'>Tectra <span className='text-gray-950 font-bold'>Clinic</span></h1>
            </div>
          <span className='h-[1px] w-full bg-gray-200 self-center'></span>    
      </div>
      
      <div className='flex flex-col  gap-y-2 font-bold text-sm text-gray-800 pr-10'>
          <h1 className='text-gray-400 text-[0.6rem] font-normal'>OVERVIEW</h1>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md'>
            <img src="/assets/icons" alt="" />
            <p>Dashboard</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Dental Dashboard</p>
          </div>
      </div>

      <div className='flex flex-col gap-y-2 font-bold text-sm text-gray-800 pr-10'>
          <h1 className='text-gray-400 text-[0.6rem] font-normal'>APPLICATIONS</h1>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Telemedicine</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Inventory Management</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Doctors</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Patients</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md'>
            <p>Appointments</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Chats</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Medical Services</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md'>
            <p>Dental Services</p>
          </div>
          <div className='flex gap-x-2 cursor-pointer p-2 rounded-md '>
            <p>Billing and Invoice</p>
          </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar
