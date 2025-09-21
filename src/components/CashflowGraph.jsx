import React from 'react'
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer  } from 'recharts'


const CashflowGraph = ({graphData}) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart data={graphData} className='text-xs text-gray-800 font-bold'>
        <CartesianGrid vertical={true} horizontal={false} strokeDasharray={"6 6"}>
        </CartesianGrid>
        <XAxis dataKey={'date'} tickFormatter={(time)=>new Date(time).toLocaleString('default',{month:'short'})}></XAxis>
        <YAxis ticks={[100000,150000,200000,250000,300000,350000,400000]} interval={0} tickFormatter={(amount)=>`${amount/100000}L`}></YAxis>
        <Tooltip labelFormatter={(time)=>new Date(time).toLocaleString('default',{month:'long',day:'numeric'})}></Tooltip>
        <Line type={'monotone'} dataKey={'Income'} stroke={'#7597a5'} strokeWidth={3} dot={false} ></Line>
        </LineChart>
    </ResponsiveContainer>  
  )
}

export default CashflowGraph
