import React from 'react'

const Loading = () => {
  return (
    <div className='fixed flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50 bg-white opacity-90'>
      <div className='flex flex-col gap-y-3 items-center'>
        <span className='loading h-1 w-20 rounded-full bg-cyan-700'>
        </span>
      </div>
    </div>
  )
}

export default Loading
