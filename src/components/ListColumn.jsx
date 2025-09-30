import React from 'react'
import { useEffect } from 'react';

const ListColumn = ({columnName,shouldSelectAllDoctors,setShouldSelectAllDoctors,setSelectedDoctors}) => {
 
  return (
    <th className='p-3'>
    <div className='flex items-center gap-x-2 text-gray-800'>
        {columnName==='No' && 
        <input checked={shouldSelectAllDoctors} onChange={(event)=>{
          if(event.target.checked){
            setShouldSelectAllDoctors(true);
          }
          else{
            setSelectedDoctors([]);
            setShouldSelectAllDoctors(false);
          }
        }} className='h-4 w-4' type="checkbox" name="doctors" id="" />
        }
        <p className='text-xs'>{columnName}</p>
        <svg className='bi bi-arrow-down-short fill-gray-800' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
        </svg>
    </div>
    
    </th>    
)
}

export default ListColumn
