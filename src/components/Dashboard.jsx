import React from 'react'
import StatisticCard from './StatisticCard'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-y-5 p-5 bg-gray-50 w-full h-full'>
        <h1 className='text-lg font-bold'>Dashboard <span className='text-slate-300'>/ Analytics and Reports</span></h1>
        <div className='flex gap-x-4'>
        <StatisticCard title={'Total Visitors'} previousValue={100} currentValue={136} total={42946}></StatisticCard>
        <StatisticCard title={'Paid Visitors'} previousValue={100} currentValue={126} total={7929}></StatisticCard>
        <StatisticCard title={'Total Appointments'} previousValue={100} currentValue={126} total={4199}></StatisticCard>
        <StatisticCard title={'New Patients'} previousValue={100} currentValue={126} total={1647}></StatisticCard>
        </div>
    </div>
  )
}

export default Dashboard
