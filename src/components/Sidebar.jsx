import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col fixed left-0 top-0 bottom-0 border-r border-r-gray-100 px-2 pt-5  z-20'>
      <div className='flex gap-x-1 items-center pb-2'>
            <img className='h-7' src="./src/assets/icons/logo.png" alt="" />
            <h1 className='font-black text-base'>Tectra <span className='text-gray-950 font-bold'>Clinic</span></h1>
        </div>
      <span className='h-[1px] w-full bg-gray-200 self-center'></span>
    </div>
  )
}

export default Sidebar
