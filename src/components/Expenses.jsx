import React, { useRef, useState } from 'react'
import randomColor from 'randomcolor';

const Expenses = () => {

    const [expensesData,setExpensesData]=useState({
          expenses:[
            {expenseName:'Rental Cost',amount:'888240'},
            {expenseName:'Wages',amount:'619000'},
            {expenseName:'Supplies',amount:'467000'}
          ],
          totalExpenses:1822240
    });

    const expenseRef=useRef(null);

    const renderExpenses=()=>{
        const expenses=expensesData.expenses.sort((a,b)=>b.amount-a.amount).map((expense)=>{
            let borderColor;
            if(expense.expenseName==='Rental Cost'){
                borderColor='#7597a5'
            }
            else if(expense.expenseName==='Wages'){
                borderColor='#f0e2c5'
            }
            else if(expense.expenseName==='Supplies'){
                borderColor='#aaaaf2'
            } 
            return {
                expenseName:expense.expenseName,
                amount:expense.amount,
                borderColor:borderColor
            };
        })
        
        return (
            <div className='flex flex-col w-full items-center gap-y-5'>
                <div style={{borderColor:expenses[0].borderColor}} className='h-72 w-72 max-lg:h-64 max-lg:w-64 max-md:h-56 max-md:w-56 max-sm:h-48 max-sm:w-48 border-4 rounded-full p-4 flex items-center justify-center'>
                    <div style={{borderColor:expenses[1].borderColor}} className='h-64 w-64 max-lg:h-56 max-lg:w-56 max-md:h-48 max-md:w-48 max-sm:h-40 max-sm:w-40 border-4 rounded-full p-4 flex items-center justify-center'>
                        <div style={{borderColor:expenses[2].borderColor}} className='h-56 w-56 max-lg:h-48 max-lg:w-48 max-md:h-40 max-md:w-40 max-sm:h-32 max-sm:w-32 border-4 rounded-full p-4 flex flex-col gap-y-3 items-center justify-center font-bold'>
                            <p>Total</p>
                            <p className='text-2xl max-lg:text-base max-md:text-sm max-sm:text-xs'>₹{expensesData.totalExpenses}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between w-full'>
                    {expenses.map((expense)=>(
                    <div className='flex flex-col gap-y-2 items-center'>
                    <div className='flex gap-x-2'>
                    <span style={{backgroundColor:expense.borderColor}} className='h-4 w-4 rounded-full'></span>
                    <span className='text-xs'>{expense.expenseName}</span>
                    </div>
                    <p className='max-lg:text-xs'>₹{expense.amount}</p>
                    </div>
                    ))}
                </div>
            </div>
            
        )
    }

  return (
    <div className='flex flex-col gap-y-20 items-center p-5 bg-white w-full rounded-lg'>
        <div className='flex w-full justify-between items-center'>
            <h1 className='font-bold max-lg:text-sm max-md:text-xs'>Expenses</h1>
            <div className='flex items-center gap-x-3 bg-white px-4 py-2 max-lg:px-2 max-md:py-1 rounded-md border border-gray-500'>
            <p className='text-xs text-black font-bold max-lg:text-sm max-md:text-xs'>Last 12 Months</p>
            <svg className='bi bi-chevron-dowm' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
        </div>
        </div>
        
        {renderExpenses()}
    </div>
  )
}

export default Expenses
