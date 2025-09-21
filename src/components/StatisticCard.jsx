import React from 'react'

const StatisticCard = ({title,previousValue,currentValue,total}) => {
    const percentageChange=(((currentValue-previousValue)/previousValue)*100).toFixed(2);
  return (
    <div className='flex flex-col w-fit p-5 bg-white rounded-lg '>
        <div className='flex gap-x-15 items-center'>
            <p className='font-bold'>{title}</p>
            <button>
            <svg className='bi bi-three-dots fill-white stroke-gray-800' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
            </button>
        </div>
        <div className='flex items-baseline gap-x-2 '>
        <p className='font-bold'>{total}</p>
        {percentageChange>0 ?
        <div className='flex items-center text-green-500 text-xs    '>
            <p>+{percentageChange}%</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
            </svg>
        </div>
        :
        <div className='flex items-center text-red-500 text-xs'>
            <p>{percentageChange}%</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
            </svg>
        </div>
        }
        <img className='h-10 w-18 self-baseline' src="./src/assets/images/graph.png" alt="" />
        </div>
    </div>
  )
}

export default StatisticCard
