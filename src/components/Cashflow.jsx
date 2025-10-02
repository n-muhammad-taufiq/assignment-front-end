import React, { useState } from 'react'
import CashflowGraph from './CashflowGraph'

const Cashflow = ({data}) => {

  const [shouldShowDateOptions,setShouldShowDateOptions]=useState(false);
  const [dateFilter,setDateFilter]=useState('');

  return (
    <div className='flex flex-col gap-y-10 bg-white p-4 max-lg:p-3 rounded-lg'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold max-lg:text-sm max-md:text-xs'>Cashflow</h1>
        <div className='relative flex items-center gap-x-3 bg-white px-4 py-2 max-md:px-2  rounded-md border border-gray-500'>
        <button onClick={()=>{
            setShouldShowDateOptions(!shouldShowDateOptions);
        }} className='flex gap-x-2 items-center text-xs text-gray-800 font-bold cursor-pointer hover:opacity-50 duration-500 outline-none text-nowrap   '>
        {dateFilter || 'All Time'}
        <svg className='bi bi-chevron-down' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg>
        </button>
        
        {shouldShowDateOptions
        &&
        <div className='absolute z-20 left-1/2 transform-[translateX(-50%)] border border-gray-100 shadow-sm text-xs text-nowrap flex flex-col items-start gap-y-2 text-gray-700 font-bold bg-white p-2 rounded-sm -bottom-43 '>
             <button onClick={()=>{
                setDateFilter('All Time')
                setShouldShowDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>All Time</button>
            <button onClick={()=>{
                setDateFilter('Last 12 Months')
                setShouldShowDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last 12 Months</button>
            <button onClick={()=>{
                setDateFilter('Last 6 Months')
                setShouldShowDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last 6 Months</button>
            <button onClick={()=>{
                setDateFilter('Last 3 Months')
                setShouldShowDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last 3 Months</button>
            <button onClick={()=>{
                setDateFilter('Last Month')
                setShouldShowDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last Month</button>
        </div>

        }
        </div>
      </div>
      <div className='flex max-lg:items-start max-md:text-xs justify-between px-4 items-center'>
        <div className='flex max-lg:flex-col max-lg:items-start max-lg:gap-y-1 items-center gap-x-4 font-bold'>
        <span className='text-sm max-lg:text-xs'>Total</span>
        <span className='text-3xl  max-lg:text-sm max-md:text-xs poppins font-bold'>{(new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:2}).format(data.totalCashflow)).replace('₹','')}</span>
        </div>

        <div className='flex items-center gap-x-4'>
          <span className='h-2 w-2 bg-[#7597a5] rounded-full'></span>
          <span className='text-sm'>Income</span>
        </div>
      </div>
      <div className='h-80'>
          <CashflowGraph graphData={data.graphData}></CashflowGraph>
      </div>
    </div>
  )
}

export default Cashflow
