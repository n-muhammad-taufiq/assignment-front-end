import React, { useEffect, useState } from 'react';
import UpdateDoctor from './UpdateDoctor';
import {createPortal} from 'react-dom'
import Loading from './Loading';

const Doctor = ({index,doctor,shouldSelectAllDoctors,selectedDoctors,setSelectedDoctors,setActionStatus,handleDeleteDoctor,shouldShowActionMenu,setShouldShowActionMenu}) => {
    const [currentDoctor,setCurrentDoctor]=useState(doctor);
    const [isSelected,setIsSelected]=useState(false);
    const [shouldShowOptions,setShouldShowOptions]=useState(false);
    const [shouldUpdateDoctor,setShouldUpdateDoctor]=useState(false);

    
    useEffect(()=>{
        if(shouldSelectAllDoctors & !isSelected){
            setIsSelected(true);
            handleSelectDoctor();
        }
        else if(!shouldSelectAllDoctors && isSelected){
            handleRemoveFromSelected();
            setIsSelected(false);
        }
    },[shouldSelectAllDoctors]);

    const handleSelectDoctor=()=>{
        setIsSelected(true);
        setSelectedDoctors(prev=>[...prev,currentDoctor]);
    }

    const handleRemoveFromSelected=()=>{
        setIsSelected(false);
        const newSelectedDoctors=selectedDoctors.filter(selectedDoctor=>selectedDoctor.id!=currentDoctor.id)
        setSelectedDoctors(newSelectedDoctors);
    }

    const UpdateDoctorPortal=()=>{
        return createPortal(
            <UpdateDoctor doctor={currentDoctor} setCurrentDoctor={setCurrentDoctor} setShouldUpdateDoctor={setShouldUpdateDoctor} setActionStatus={setActionStatus}></UpdateDoctor>,
            document.body
        )
    }


  return (
    <>
    
    <tr className='text-sm font-bold'>
        <td className='p-3'>
            <div className='flex items-center gap-x-2'>
            <input onChange={(event)=>{
                if(event.target.checked){
                    handleSelectDoctor()
                }
                else{
                    handleRemoveFromSelected();
                }
            }} checked={isSelected} type="checkbox" name="" id="" />
            <p>{index<10 ? `0${index+1}` : index+1}</p>
            </div>
        </td>

        <td className='p-3'>
            <div className='flex items-center gap-x-3'>
                {currentDoctor.profilePhoto ?
                <img className='h-8 w-8 aspect-square rounded-full object-cover mb-1' src={currentDoctor.profilePhoto} alt="" />
                :
                <span className='self-center flex items-center justify-center h-8 w-8 bg-gray-100 p-1 rounded-full'>
                <svg className='bi bi-person-fill fill-gray-200 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                </span>
                }
                <p>{currentDoctor.name}</p>
            </div>
        </td>

        <td className='p-3'>{currentDoctor.specialty}</td>
        <td className='p-3'>{new Date(currentDoctor.dateOfBirth).toLocaleString('default',{day:'numeric',month:'short',year:'numeric'})}</td>
        <td className='p-3'>{currentDoctor.emailAddress}</td>
        <td className='p-3'>
        {currentDoctor.status==='Active' ? 
        <button className="py-1 px-10 bg-emerald-50 border border-emerald-200 text-emerald-300 rounded-full font-bold">Active</button> 
        :
        <button className="py-1 px-10 bg-red-50 border border-red-200 text-red-300 rounded-full font-bold">Inactive</button>   
        }
        </td>
        <td className='p-3'>+{currentDoctor.countryCode} {currentDoctor.contactNumber}</td>
        <td className='p-3'>
            <div className='relative flex gap-x-1 w-20 h-5 '>
            <button onClick={()=>{
                if(shouldShowActionMenu.doctorId===doctor.id){
                    setShouldShowActionMenu({doctorId:null});
                }
                else{
                    setShouldShowActionMenu({doctorId:doctor.id});
                }
            }} className='cursor-pointer hover:opacity-50 duration-500'>
            <svg className='bi bi-three-dots fill-black' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
            </svg>
            </button>
            {shouldShowActionMenu.doctorId===doctor.id &&
            <div className='h-fit flex flex-col items-start gap-y-2 border border-gray-200 fade-in bg-white rounded-lg p-3 text-xs text-gray-800'>
                <button className='cursor-pointer hover:opacity-50 duration-500' onClick={()=>{
                    setShouldUpdateDoctor(true);
                    setShouldShowActionMenu({doctorId:null});
                }}>Update</button>
                <button className='cursor-pointer hover:opacity-50 duration-500' onClick={()=>{
                    handleDeleteDoctor(currentDoctor);
                    setShouldShowActionMenu({doctorId:null});
                }}>Delete</button>
            </div>
            }
            </div>
        </td>
    </tr>
    {
        shouldUpdateDoctor &&
        <UpdateDoctorPortal></UpdateDoctorPortal>
    }

    </>
  )
}

export default Doctor
