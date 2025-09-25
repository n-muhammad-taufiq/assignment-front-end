import React from 'react'
import StatisticCard from './StatisticCard'
import Cashflow from './Cashflow'
import Expenses from './Expenses'
import DoctorsOverview from './DoctorsOverview'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-y-5 p-5  w-full h-full'>
        <h1 className='text-lg max-lg:text-sm max-sm:text-xs font-bold'>Dashboard <span className='text-slate-300'>/ Analytics and Reports</span></h1>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-w-full md:justify-around w-full max-md:justify-items-start gap-3'>
        <StatisticCard title={'Total Visitors'} previousValue={100} currentValue={136} total={42946}></StatisticCard>
        <StatisticCard title={'Paid Visitors'} previousValue={100} currentValue={126} total={7929}></StatisticCard>
        <StatisticCard title={'Total Appointments'} previousValue={100} currentValue={126} total={4199}></StatisticCard>
        <StatisticCard title={'New Patients'} previousValue={100} currentValue={126} total={1647}></StatisticCard>
        </div>
        <div className='grid grid-cols-[2fr_1fr] max-md:grid-cols-1 max-md:gap-y-3 gap-x-5 '>
        <Cashflow data={{
          graphData:[
          {date:new Date('2025-01-01').getTime(),Income:250000},
          {date:new Date('2025-02-01').getTime(),Income:180000},
          {date:new Date('2025-03-01').getTime(),Income:235000},
          {date:new Date('2025-04-01').getTime(),Income:419000},
          {date:new Date('2025-05-01').getTime(),Income:370000},
          {date:new Date('2025-06-01').getTime(),Income:210000},
          {date:new Date('2025-07-01').getTime(),Income:165000},
          {date:new Date('2025-08-01').getTime(),Income:190000},
          {date:new Date('2025-09-01').getTime(),Income:295000},
          {date:new Date('2025-10-01').getTime(),Income:320000},
          {date:new Date('2025-11-01').getTime(),Income:230000},
          {date:new Date('2025-12-01').getTime(),Income:210000},
          ],
          totalCashflow:4410840
        }}></Cashflow>
        <Expenses></Expenses>
        </div>
        <DoctorsOverview></DoctorsOverview>
    </div>
  )
}

export default Dashboard
