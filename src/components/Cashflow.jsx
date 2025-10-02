import React from 'react'
import CashflowGraph from './CashflowGraph'

const Cashflow = ({data}) => {
  return (
    <div className='flex flex-col gap-y-10 bg-white p-4 max-lg:p-3 rounded-lg'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold max-lg:text-sm max-md:text-xs'>Cashflow</h1>
        <div className='flex items-center gap-x-3 bg-white px-4 py-2 max-lg:px-2 max-md:py-1 rounded-md border border-gray-500'>
            <p className='text-xs text-black font-bold max-lg:text-sm max-md:text-xs'>Last 12 Months</p>
            <svg className='bi bi-chevron-down' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
        </div>
      </div>
      <div className='flex max-lg:items-start max-md:text-xs justify-between px-4 items-center'>
        <div className='flex max-lg:flex-col max-lg:items-start max-lg:gap-y-1 items-center gap-x-4 font-bold'>
        <span className='text-sm max-lg:text-xs'>Total</span>
        <span className='text-xl max-lg:text-sm max-md:text-xs'>{(new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:2}).format(data.totalCashflow)).replace('₹','')}</span>
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
