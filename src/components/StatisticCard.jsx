import React from 'react'

const StatisticCard = ({title,previousValue,currentValue,total}) => {
    const percentageChange=Math.round((((currentValue-previousValue)/previousValue)*100))
  return (
    <div className='w-full max-w-full flex flex-col gap-y-3  p-5 max-lg:p-3 max-sm:p-2 bg-white rounded-lg'>
        <div className='flex justify-between gap-x-3 items-center'>
            <p className='font-bold max-lg:text-sm max-md:text-xs text-nowrap max-lg:self-center'>{title}</p>
            <button className='cursor-pointer'>
            <svg className='bi bi-three-dots fill-white stroke-gray-800' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
            </button>
        </div>
        <div className='flex max-lg:flex-col max-lg:items-center max-lg:gap-y-3 max-lg:text-sm max-md:text-xs items-baseline gap-x-3 '>
        <p className='font-bold text-2xl  max-lg:self-center  poppins'>{new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR','minimumFractionDigits':0,maximumFractionDigits:'2'}).format(total).replace('₹','')}</p>
        
        {percentageChange>0 ?
        <div className='flex items-center text-green-500 text-xs   '>
        <p className='poppins'>+{percentageChange}%</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
        </svg>
        </div>  
        :
        <div className='flex items-center text-red-500 text-xs'>
        <p className='poppins'>{percentageChange}%</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
        </svg>
        </div>
        }
        
        <div className='h-10 w-30 max-lg:w-24 flex justify-end self-baseline max-lg:self-center  px-2'>
        <img className='h-auto max-w-full object-fit' src="assets/images/graph.png"/>
        </div>  
        </div>
    </div>
  )
}

export default React.memo(StatisticCard)

//h-10 w-18 max-lg:h-10 max-lg:w-12 max-h-full max-w-full self-baseline