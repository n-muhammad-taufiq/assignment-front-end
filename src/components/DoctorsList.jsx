import React, { useContext, useEffect, useState } from 'react'
import Doctor from './Doctor'
import ListColumn from './ListColumn'
import UpdateDoctor from './UpdateDoctor'
import AddDoctor from './AddDoctor'
import ActionStatus from './ActionStatus'
import { AuthContext } from '../../context/AuthProvider'

const DoctorsList = ({allDoctors,doctors,setAllDoctors}) => {
    const [shouldSelectAllDoctors,setShouldSelectAllDoctors]=useState(false);
    const [selectedDoctors,setSelectedDoctors]=useState([]);  
    const [shouldAddDoctor,setShouldAddDoctor]=useState(false);  
    const [actionStatus,setActionStatus]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [shouldShowActionMenu,setShouldShowActionMenu]=useState({doctorId:null});
    const {fetchWithAuth}=useContext(AuthContext);

    useEffect(()=>{
        console.log(selectedDoctors);
        if(selectedDoctors.length===0){
            setShouldSelectAllDoctors(false);
        }
        if(allDoctors.length>0 && selectedDoctors.length===doctors?.length){
            setShouldSelectAllDoctors(true);
        }
    },[selectedDoctors])

    const handleDeleteDoctor=async (doctor)=>{

        console.log('handleDelete function');
        const deletedDoctor=doctor;
        const options={
                credentials:'include',
                method:'DELETE'
        }
        const url=`https://tectraclinic.onrender.com/doctors/${deletedDoctor.id}`;
        try{
            await fetchWithAuth(url,options);
            const newDoctors=doctors.filter(doctor=>doctor.id!=deletedDoctor.id);
            console.log('deleted doctor: ',deletedDoctor);
            console.log('newDoctors: ',newDoctors);
            setAllDoctors(newDoctors);
        }
        catch(error){
            console.log(error);
        }
        if(shouldSelectAllDoctors){
            setShouldSelectAllDoctors(false);
        }
        if(selectedDoctors){
            setSelectedDoctors([]);
        }
    }

    const handleMultipleDeletion=async()=>{
        const data=selectedDoctors.map(doctor=>doctor.id);
        console.log('data for multiple deleton',data);
         try{
            const options={
                 headers:{
                    'Content-Type':'application/json',
                },
                credentials:'include',
                method:'POST',
                body:JSON.stringify({
                    data:data
                }
                )
            }
            const url='https://tectraclinic.onrender.com/doctors/deleteDoctors';
            await fetchWithAuth(url,options);
            let newDoctors=[];
            allDoctors.forEach((doctor)=>{
                if(!data.includes(doctor.id)){
                    newDoctors.push(doctor);
                }
            });
            setAllDoctors(newDoctors);
        }
        catch(error){
            console.log(error);
        }
        if(shouldSelectAllDoctors){
            setShouldSelectAllDoctors(false);
        }
        if(selectedDoctors){
            setSelectedDoctors([]);
        }
    }


  return (
    <>
    <div className='flex sticky top-32 max-lg:top-60 z-20 border-b border-gray-50 pb-2 bg-white w-full justify-end max-lg:justify-end max-lg:py-2 items-center px-3 gap-x-5'>
    <div className='flex gap-x-5 '>
        {selectedDoctors.length>0 
        &&
        <button onClick={()=>{
        handleMultipleDeletion();
        }} className='flex gap-x-2 mt-0.5 items-center justify-center cursor-pointer hover:opacity-50 duration-500'>
        <svg className='fill-gray-500 bi bi-trash' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
        <span className='text-xs text-gray-800 font-bold'>Delete</span>
        </button>
        }
        <button onClick={()=>{
        setShouldAddDoctor(true);
        }} disabled={selectedDoctors.length>0} className='disabled:text-gray-300 disabled:cursor-default cursor-pointer not-disabled:hover:opacity-50 not-disabled:duration-500 text-gray-800 font-bold text-xs border border-gray-500  px-4 py-2 rounded-md'>Add Doctor</button>
    </div>
    </div>

    <div className='overflow-x-auto hide-scrollbar scroll-smooth '>
        <table className='max-w-full min-w-full'>
        <thead>
        <tr className='bg-gray-100 max-w-full'>
            <ListColumn columnName={'No'} shouldSelectAllDoctors={shouldSelectAllDoctors} setShouldSelectAllDoctors={setShouldSelectAllDoctors} setSelectedDoctors={setSelectedDoctors}></ListColumn>
            <ListColumn columnName={'Name'}></ListColumn>
            <ListColumn columnName={'Specialty'}></ListColumn>
            <ListColumn columnName={'DOB'}></ListColumn>    
            <ListColumn columnName={'Email Address'}></ListColumn>
            <ListColumn columnName={'Status'}></ListColumn>
            <ListColumn columnName={'Contact'}></ListColumn>
            <ListColumn columnName={'Action'}></ListColumn>
        </tr>
        </thead>
        <tbody>
            {doctors?.map((doctor,index)=>(
                <Doctor index={index} key={doctor.id} doctor={doctor} shouldSelectAllDoctors={shouldSelectAllDoctors} selectedDoctors={selectedDoctors} setSelectedDoctors={setSelectedDoctors} 
                setActionStatus={setActionStatus} handleDeleteDoctor={handleDeleteDoctor} shouldShowActionMenu={shouldShowActionMenu} setShouldShowActionMenu={setShouldShowActionMenu}></Doctor>
            ))}
        </tbody>    
    </table>
    </div>

    {shouldAddDoctor
    &&
    <AddDoctor setShouldAddDoctor={setShouldAddDoctor} setActionStatus={setActionStatus} allDoctors={allDoctors} setAllDoctors={setAllDoctors}></AddDoctor>
    }

    {actionStatus.message &&
    <ActionStatus actionStatus={actionStatus}></ActionStatus>
    }
    </>
  )
}

export default DoctorsList

/*<div className='flex flex-col w-full justify-between text-gray-600 font-bold'>
        <div className='flex w-full bg-gray-100 justify-between items-center p-3'>
        <ListColumn columnName={'No'}></ListColumn>
        <ListColumn columnName={'Name'}></ListColumn>
        <ListColumn columnName={'Specialty'}></ListColumn>
        <ListColumn columnName={'DOB'}></ListColumn>
        <ListColumn columnName={'Email Address'}></ListColumn>
        <ListColumn columnName={'Status'}></ListColumn>
        <ListColumn columnName={'Contact'}></ListColumn>
        <ListColumn columnName={'Action'}></ListColumn>
        </div>
        <Doctor></Doctor>
    </div>*/