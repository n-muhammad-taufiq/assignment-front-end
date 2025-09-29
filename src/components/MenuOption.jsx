import React, { useEffect, useState } from 'react'
import SVG from 'react-inlinesvg'
import { useNavigate, useParams } from 'react-router-dom';

const MenuOption = ({optionName,iconName,navigationURL,currentOption,setCurrentOption}) => {
    const [isSelected,setIsSelected]=useState(false);
    const navigate=useNavigate();


  return (
    <div onClick={()=>{
        setCurrentOption(optionName)
        //navigate('') -> replace this with actual route path in production
    }} className={`${currentOption===optionName ? 'bg-blue-100' : ''} flex items-center gap-x-2 cursor-pointer p-2 px-3 rounded-lg`}>
        <p>{optionName}</p>
    </div>
  )
}

export default MenuOption
