import React from 'react'

const GraphToolTip = ({active,payload,label}) => {
  if(active && payload && payload.length){
    return (
        <div className='flex flex-col gap-y-2 bg-white rounded-md p-2 '>
            <div className='flex gap-x-3 items-center'>
                <p className='font-bold poppins'>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:2}).format(payload[0].value)}</p>
                <p className='text-xs text-gray-600 font-normal'>{new Date(label).toLocaleString('en-US',{day:'numeric',month:'short'})}</p>
            </div>
            <div className='flex gap-x-2 items-center'>
                <span className='h-2 w-2 bg-[#7597a5] rounded-full'></span>
                <p className='text-xs'>Income</p>
            </div>
        </div>
    )
  }
}

export default GraphToolTip
