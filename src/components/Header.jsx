import React from 'react'

const Header = () => {
  return (
    <div className='flex w-full border border-gray-50 right-0 bg-slate-50 px-5 py-3'>
        <div className='flex items-center gap-x-3 bg-white py-2 pl-2 rounded-sm'>
        <svg className='bi bi-search  fill-gray-700 stroke-4' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input className='text-xs outline-none w-full text-gray-950' type="text" placeholder='Search...' />
        </div>
    </div>
  )
}

export default Header
