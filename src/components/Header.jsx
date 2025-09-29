import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import Sidebar from './Sidebar';

const Header = () => {
  const [shouldOpenMenu,setShouldOpenMenu]=useState(false);
  const {userData}=useContext(AuthContext);


  useEffect(()=>{
    if(shouldOpenMenu){
      document.body.style.overflow='hidden';
    }

    return ()=>{
      document.body.style.overflow='auto';
    }
  },[shouldOpenMenu])

  if(userData){

  return (
    <>
    <div className='header flex sticky top-0 z-30 w-full items-center bg-slate-50 px-8 max-lg:px-2 py-4 justify-between gap-x-3 border-b-2 border-b-gray-200'>
      {
      !shouldOpenMenu &&
      <div className='lg:hidden'>
      <button className='' onClick={()=>{
      setShouldOpenMenu(true);
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg>
      </button>
      </div>  
      }

        
        <div className='flex max-w-full w-55  items-center gap-x-3 bg-white pl-2 h-fit rounded-lg border-2 border-gray-100 py-2'>
        <svg className='bi bi-search h-2 w-2 fill-gray-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input className='text-xs outline-none w-full text-gray-900 font-bold ' type="text" placeholder='Search...' />
        </div>

        <div className='flex gap-x-3 items-center '>
          <div className='flex gap-x-2 items-center'>
              <button className='flex items-center justify-center h-7 w-7 rounded-full border border-gray-200 cursor-pointer hover:opacity-50 duration-500 '>
              <svg className='bi bi-bell fill-gray-800 h-3 w-3' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
              </svg>
              </button>

              <button className='flex items-center justify-center h-7 w-7 rounded-full border border-gray-200 cursor-pointer hover:opacity-50 duration-500'>
              <svg className='bi bi-gear fill-gray-800 h-3 w-3' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
              </svg>
              </button>

              <button className='flex items-center justify-center h-7 w-7 rounded-full border border-gray-200 cursor-pointer hover:opacity-50 duration-500'>
              <svg className='bi bi-box-arrow-right fill-gray-800 h-3 w-3' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg>
              </button>

              <span className='h-10 bg-gray-200 w-[1px]'>
              </span>

              <div className='flex gap-x-1 items-center'>
              <div className='h-9 w-9 flex items-center justify-center'>
                <img className='max-h-full max-w-full object-cover' src={userData.profile_pic} alt="" />
              </div>
              <div className='flex flex-col items-start'>
              <p className='text-[0.6rem] font-bold'>{userData.user_name}</p>
              <div className='flex gap-x-1   items-center'>
                <p className='text-[0.5rem]'>{userData.status[0].toUpperCase()+userData.status.slice(1)}</p>
                <span className={`${userData.status ? 'bg-green-400' : 'bg-red-500'} h-1 w-1 rounded-full`}></span>

              </div>
              </div>
              </div>
          </div> 
          
        </div>
    </div>

    {shouldOpenMenu
    &&
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/90 z-50'>
        <Sidebar shouldOpenMenu={shouldOpenMenu} setShouldOpenMenu={setShouldOpenMenu}></Sidebar>
    </div>
    } 
    </>
  )
}
}

export default Header