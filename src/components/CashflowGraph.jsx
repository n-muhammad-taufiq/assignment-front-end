import React from 'react'
import {LineChart,AreaChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer, Area  } from 'recharts'
import GraphToolTip from './GraphToolTip'


const CashflowGraph = ({graphData}) => {
  return (
    <ResponsiveContainer  width={'100%'} height={'100%'}>
        <AreaChart data={graphData} className='text-xs text-gray-800 font-bold '>
        <CartesianGrid vertical={true} horizontal={false} strokeDasharray={"6 6"}>
        </CartesianGrid>
        <XAxis dataKey={'date'} tickFormatter={(time)=>new Date(time).toLocaleString('default',{month:'short'})}></XAxis>
        <YAxis width={30} ticks={[100000,150000,200000,250000,300000,350000,400000]} interval={0} tickFormatter={(amount)=>`${amount/100000}L`}></YAxis>
        <Tooltip content={<GraphToolTip></GraphToolTip>}></Tooltip>

        <defs>
          <linearGradient id='shadeColor' x1={0} y1={0} x2={0} y2={1}>
          <stop offset={'0%'} stopColor='#7597a5' stopOpacity={0.6}></stop>
          <stop offset={'100%'} stopColor='#7597a5' stopOpacity={0}></stop>
          </linearGradient>
        </defs>
        <Area type={'monotone'} dataKey={'Income'} stroke='#7597a5'  strokeWidth={2} fill={'url(#shadeColor)'} isAnimationActive={false}></Area>
        </AreaChart>  
    </ResponsiveContainer>    
  )
} 

export default React.memo(CashflowGraph);
