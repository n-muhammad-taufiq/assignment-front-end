import React, { useState } from 'react'
import {menuOptions} from '../menuOptions'
import MenuOption from './MenuOption'

const Sidebar = ({shouldOpenMenu=false,setShouldOpenMenu}) => {

  const [currentOption,setCurrentOption]=useState('Dashboard');

  return (
    <>
    <div className={`${!shouldOpenMenu ? 'max-lg:hidden' : 'slide-left-right'} flex flex-col h-screen border-r-2 border-r-gray-200 bg-slate-50 pt-5 pr-3 gap-y-7 pl-4 max-lg:relative max-lg:slide-left-right max-lg:w-fit max-lg:h-full max-lg:border-r max-lg:border-r-gray-100 max-lg:text-sm max-md:text-xs px-3 `}>


      <button onClick={()=>{
            setShouldOpenMenu(false);
        }} className='lg:hidden absolute right-2 top-2 h-5 w-5 rounded-full flex items-center justify-center cursor-pointer '>
        <svg className='fill-gray-500' xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </button>

      <div className='flex flex-col gap-y-5 '>
            <div className='flex gap-x-1 items-center'>
              <img className='h-7 w-fit' src="assets/icons/tectra_clinic_logo.png" alt="" />
              <h1 className='font-black text-base'>Tectra <span className='text-gray-950 font-bold'>Clinic</span></h1>
            </div>
          <span className='h-[1px] w-full bg-gray-200 self-center'></span>    
      </div>
      
      <div className='flex flex-col  gap-y-2 font-bold text-sm text-gray-800 pr-10'>
          <h1 className='text-gray-400 text-[0.6rem] font-normal'>OVERVIEW</h1>
          {menuOptions.overview.map((menuOption)=>(
            <MenuOption optionName={menuOption.optionName} iconName={menuOption.iconName} navigationURL={menuOption.navigationURL} currentOption={currentOption} setCurrentOption={setCurrentOption}></MenuOption>
          ))} 
      </div>

      <div className='flex flex-col gap-y-2 font-bold text-sm text-gray-800 pr-10'>
          <h1 className='text-gray-400 text-[0.6rem] font-normal'>APPLICATIONS</h1>
          {menuOptions.applications.map((menuOption)=>(
            <MenuOption optionName={menuOption.optionName} iconName={menuOption.iconName} navigationURL={menuOption.navigationURL} currentOption={currentOption} setCurrentOption={setCurrentOption}></MenuOption>
          ))}
      </div>
    </div>
    </>
  )
}

export default Sidebar
