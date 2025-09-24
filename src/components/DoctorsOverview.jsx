import React, { useEffect, useState } from 'react'
import DoctorsList from './DoctorsList'

const DoctorsOverview = () => {

    const [allDoctors,setAllDoctors]=useState(null);
    const [doctors,setDoctors]=useState(null);
    const [search,setSearch]=useState(null);
    const [shouldShowSpecialityOptions,setShouldShowSpecialityOptions]=useState(false);
    const [filter,setFilter]=useState({specialty:null,timePeriod:null})

    useEffect(()=>{
        const fetchDoctors=async()=>{
            try{
                const responseObj=await fetch('http://localhost:3000/doctors/1');
                if(responseObj.ok){
                    const response=await responseObj.json();
                    console.log(response);
                    setAllDoctors(response.data.doctors);
                    setDoctors(response.data.doctors);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        if(!allDoctors){
            fetchDoctors();
        }
    },[allDoctors])

    useEffect(()=>{
        setDoctors(allDoctors);
    },[allDoctors])

    useEffect(()=>{
        console.log('doctors:',doctors);
        console.log('allDoctors:',allDoctors)
    },[doctors,allDoctors]);

    useEffect(()=>{
        const handleSearch=()=>{
            if(search===''){
            setDoctors(allDoctors);
        }
        else{
            let newDoctors=[];
            allDoctors.forEach((doctor)=>{
                for(const [key,value] of Object.entries(doctor)){
                    console.log('doctor',doctor);
                    if(key==='dateOfBirth'){
                       const date=new Date(value);
                       const day=String(date.getDate()).padStart(2,"0");
                       const month=String(date.getMonth()+1).padStart(2,"0");
                       const year=date.getFullYear();

                       const format1=date.toLocaleString('default',{day:'numeric',month:'short',year:'numeric'}).toLowerCase();
                       const format2=`${year}/${month}/${day}`;
                       const format3=`${year}-${month}-${day}`;


                        if(format1.includes(search.toLowerCase())|| format2.includes(search.toLowerCase()) || format3.includes(search.toLowerCase())){
                            newDoctors.push(doctor);
                        }
                    } 
                    else if(String(value).toLowerCase()===(search.toLowerCase())){
                        newDoctors.push(doctor);
                    }
                }
            });
            console.log(newDoctors);
            setDoctors(newDoctors);
        }
        }
        
        let timeOut;
        if(search!=null){
            setTimeout(()=>{

            handleSearch();
            },2000) 
        }
        
        
        return ()=>{
            if(timeOut){
                clearTimeout(timeOut);
            }
        }
        
    },[search]);

    useEffect(()=>{
        if(filter.specialty){
            const newDoctors=allDoctors?.filter(doctor=>{
            return doctor.specialty===filter.specialty;
            });
            setDoctors(newDoctors);
        }
        else{
            setDoctors(allDoctors);
        }
        
    },[filter]);

    const getSpecialties=()=>{
        let specialties=[];
        allDoctors.forEach((doctor)=>{
            if(!specialties.includes(doctor.specialty)){
                specialties.push(doctor.specialty);
            }
        });
        return specialties.map((specialty)=>{
            return <button onClick={()=>{
                setFilter({specialty:specialty});
                setShouldShowSpecialityOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>{specialty}</button>
        })
    }

    if(allDoctors && doctors){
        return (
        <div className='flex flex-col gap-y-3 bg-white rounded-lg w-full pb-10'>
        <div className='flex w-full justify-between items-center p-4 '>
        <h1 className='font-bold'>Doctors Overview</h1>
        <div className='flex gap-x-4 items-center '>
        <div className='flex items-center gap-x-4 bg-gray-100 p-3 rounded-md'>
        <svg className='bi bi-search fill-gray-500' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input value={search} onChange={(event)=>{
            setSearch(event.target.value);
        }} className='text-xs text-gray-950 font-bold outline-none relative' type="text" placeholder='Search...' />
        </div>
        <div className='relative bg-white'>
            <button onClick={()=>{
                setShouldShowSpecialityOptions(!shouldShowSpecialityOptions);
            }} className='outline-none flex items-center gap-x-3 cursor-pointer rounded-md border border-gray-500  px-4 py-2'>
            <p className='text-xs text-gray-800 font-bold'>{filter.specialty || 'Specialty'}</p>
            <svg className='bi bi-chevron-dowm' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
            </button>
            {shouldShowSpecialityOptions
            &&
            <div className='absolute border border-gray-100 shadow-sm text-xs text-nowrap left-1/2 transform-[translateX(-50%)] flex flex-col items-start gap-y-2 text-gray-700 font-bold bg-white p-2 rounded-sm'>
                <button className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start' onClick={()=>{
                    setFilter({specialty:null});
                    setShouldShowSpecialityOptions(false);
                }}>All</button>
                {getSpecialties()}
            </div>
            }
        </div>
        <div className='flex items-center gap-x-3 bg-white px-4 py-2 rounded-md border border-gray-500'>
        <p className='text-xs text-black font-bold'>Last 12 Months </p>
        <svg className='bi bi-chevron-dowm' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg>
        </div>
        </div>
        </div>
        <DoctorsList allDoctors={allDoctors} doctors={doctors} setAllDoctors={setAllDoctors}></DoctorsList>
        </div>
        )
    }
  
}

export default DoctorsOverview
