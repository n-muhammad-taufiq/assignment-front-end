import React, { useContext, useEffect, useState } from 'react'
import DoctorsList from './DoctorsList'
import { AuthContext } from '../../context/AuthProvider';
import Loading from './Loading';
import { useMemo } from 'react';

const DoctorsOverview = () => {

    const [allDoctors,setAllDoctors]=useState([]);
    const [doctors,setDoctors]=useState([]);
    const [search,setSearch]=useState('');
    const [shouldShowSpecialityOptions,setShouldShowSpecialityOptions]=useState(false);
    const [shouldShowJoiningDateOptions,setShouldShowJoiningDateOptions]=useState(false);
    const [filter,setFilter]=useState({specialty:null,joiningDate:''});
    const [isSearchTriggered,setIsSearchTriggered]=useState(false);
    const {userData,fetchWithAuth}=useContext(AuthContext);

    const [isLoading,setIsLoading]=useState(true);
    
      useEffect(()=>{
        if(isLoading && allDoctors && doctors ){
            setIsLoading(false);
        }
        
      },[allDoctors,doctors])
 
    useEffect(()=>{
        const fetchDoctors=async()=>{
            try{
                const options={
                    credentials:'include'
                };
                const url=`https://tectraclinic.onrender.com/doctors/${userData.id}`;
                const responseObj=await fetchWithAuth(url,options);
                if(responseObj.ok){
                    const response=await responseObj.json();
                    setAllDoctors(response.data.doctors);
                    setDoctors(response.data.doctors);
                }
            }
            catch(error){
                console.error(error);
            }
        }
        if(allDoctors.length===0 && userData){
            fetchDoctors();
        }
    },[allDoctors,userData])


     useEffect(()=>{
        let timeOut;
        if(allDoctors && isSearchTriggered){
            timeOut=setTimeout(()=>{
            handleSearch();
            },1500) 
        }
        
        return ()=>{
            if(timeOut){
                clearTimeout(timeOut);
            }
        }
        
    },[search,allDoctors]);

    useEffect(()=>{
        if(filter.joiningDate || filter.specialty){
             handleFilter();
        }
    },[filter])

    useEffect(()=>{
        setDoctors(allDoctors);
    },[allDoctors]);


    const IsDateOfBirthMatch=(doctor,searchValue,dateOfBirth,shouldFilter)=>{
        const date=new Date(dateOfBirth);
        const day=String(date.getDate()).padStart(2,"0");
        const month=String(date.getMonth()+1).padStart(2,"0");
        const year=date.getFullYear();
        const format1=date.toLocaleString('default',{day:'numeric',month:'short',year:'numeric'}).toLowerCase();
        const format2=`${year}/${month}/${day}`;
        const format3=`${year}-${month}-${day}`;

        if(format1.includes(searchValue.toLowerCase())|| format2.includes(searchValue.toLowerCase()) || format3.includes(searchValue.toLowerCase())){
            if((shouldFilter && filter.specialty && filter.specialty===doctor.specialty) || (!shouldFilter || !filter.specialty)){
            return true;
            }
        }
        return false;
    }

    const handleSearch=()=>{
        if(isSearchTriggered && search===''){
        if(filter.specialty || filter.joiningDate){
        console.log('calling handleFilter because filter is ',filter);
        handleFilter();
        }
        else{
        console.log('setting to allDoctors');
        setDoctors(allDoctors);
        }
        }
        else if(isSearchTriggered && search){
        if(filter.specialty || filter.joiningDate){
        
        console.log('calling handleFilter because filter is ',filter);
        handleFilter();
        }
        else{
        console.log('calling getDoctorsBySearch');
        const newDoctors=getDoctorsBySearch(search);
        setDoctors(newDoctors);
        } 
        }
    }
    

    const getDoctorsBySearch=(searchValue)=>{
        console.log('inside getDoctorsBySearch');
        let newDoctors=[];
        let addedDoctorIds=[]
        allDoctors?.forEach((doctor)=>{
            for(const [key,value] of Object.entries(doctor)){
            if(!addedDoctorIds.includes(doctor.id)){
                if(key==='dateOfBirth'){
                    if(IsDateOfBirthMatch(doctor,searchValue,value,true)){
                       if(filter.specialty || filter.joiningDate){
                        if(filter.specialty && filter.specialty===doctor.specialty){
                            console.log('the doctor ',doctor,' is pushed to newDoctors');
                            newDoctors.push(doctor);  
                            addedDoctorIds.push(doctor.id);
                        }
                        else if(filter.joiningDate && new Date(filter.joiningDate)===new Date(doctor.joiningDate)){
                                console.log('the doctor ',doctor,' is pushed to newDoctors');
                            newDoctors.push(doctor);  
                            addedDoctorIds.push(doctor.id);
                        }
                        }
                        else{
                            console.log('the doctor ',doctor,' is pushed to newDoctors');
                            newDoctors.push(doctor);
                            addedDoctorIds.push(doctor.id);
                        }
                    }
                } 
                else if(String(value).toLowerCase().includes((searchValue.toLowerCase()))){
                    console.log(doctor,' matches with key ',key);
                    if(filter.specialty || filter.joiningDate){
                        if(filter.specialty && filter.specialty===doctor.specialty){
                            console.log('the doctor ',doctor,' is pushed to newDoctors');
                            newDoctors.push(doctor);  
                            addedDoctorIds.push(doctor.id);
                        }
                        else if(filter.joiningDate && new Date(filter.joiningDate)===new Date(doctor.joiningDate)){
                            console.log('the doctor ',doctor,' is pushed to newDoctors');
                            newDoctors.push(doctor);  
                            addedDoctorIds.push(doctor.id);
                        }
                    }
                    else{
                        console.log('the doctor ',doctor,' is pushed to newDoctors');
                        newDoctors.push(doctor);
                        addedDoctorIds.push(doctor.id);
                    }
                }
                else{
                    console.log('the doctor ',doctor.name,' does not match with the key');
                }
            }
            else{
                console.log(doctor.name,'already added');
            }
        }
        });
        console.log('final newDoctors array :',newDoctors);
        return newDoctors;
    }

    const handleFilter=()=>{
        if(filter.specialty || filter.joiningDate){
            if(search){
                filterWithSearch();  
            }
            else{
                let newDoctors=allDoctors;
                if(filter.specialty){
                    newDoctors=allDoctors?.filter(doctor=>{
                    return doctor.specialty===filter.specialty;
                    });
                }
                if(filter.joiningDate){
                    let date=new Date();
                    if(filter.joiningDate==='Last 12 Months'){
                        date.setFullYear(date.getFullYear()-1);
                    }
                    else if(filter.joiningDate==='Last 6 Months'){
                        date.setMonth(date.getMonth()-6);
                    }
                    else if(filter.joiningDate==='Last 3 Months'){
                        date.setMonth(date.getMonth()-3);
                    }
                    else if(filter.joiningDate==='Last Month'){
                        date.setMonth(date.getMonth()-1);
                    }
                    date.setHours(0,0,0,0);
                    newDoctors=newDoctors.filter((doctor)=>{
                        const joiningDate=new Date(doctor.joiningDate);
                        joiningDate.setHours(0,0,0,0);
                        return joiningDate>=date
                    });
                }
                setDoctors(newDoctors);
            }
        }
        else if(search){
            handleSearch();
        }
        else{
            setDoctors(allDoctors);
        }
    }

    const filterWithSearch=()=>{
        let newDoctors=[];
        let addedDoctorIds=[];
        allDoctors.forEach((doctor)=>{
        for(const [key,value] of Object.entries(doctor)){
        if(!addedDoctorIds.includes(doctor.id)){
        if(key==='dateOfBirth' && IsDateOfBirthMatch(doctor,search,value,false)){
        newDoctors.push(doctor);
        addedDoctorIds.push(doctor.id);
        }
        else if(String(value).toLowerCase().includes(search.toLowerCase())){
        newDoctors.push(doctor);
        addedDoctorIds.push(doctor.id);
        }
        }
        }
        });
        if(filter.specialty){
            newDoctors=newDoctors.filter(doctor=>doctor.specialty===filter.specialty);

        }
        if(filter.joiningDate){
            let date=new Date();
            if(filter.joiningDate==='Last 12 Months'){
                date.setFullYear(date.getFullYear()-1);
                
            }
            else if(filter.joiningDate==='Last 6 Months'){
                date.setMonth(date.getMonth()-6);
            }
            else if(filter.joiningDate==='Last 3 Months'){
                date.setMonth(date.getMonth()-3);
            }
            else if(filter.joiningDate==='Last Month'){
                date.setMonth(date.getMonth()-1);
            }
            date.setHours(0,0,0,0);
            newDoctors=newDoctors.filter((doctor)=>{
                const joiningDate=new Date(doctor.joiningDate);
                joiningDate.setHours(0,0,0,0);
                return joiningDate>=date
            });
            
        }
        setDoctors(newDoctors);
    }

    const getSpecialties=()=>{
        let specialties=[];
        allDoctors.forEach((doctor)=>{
            if(!specialties.includes(doctor.specialty)){
                specialties.push(doctor.specialty);
            }
        });
        return specialties.map((specialty)=>{
            return <button onClick={()=>{
                setFilter({...filter,specialty:specialty});
                setShouldShowSpecialityOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>{specialty}</button>
        })
    }

       
    if(isLoading){
        return <Loading></Loading>
    }

    if(allDoctors && doctors){
        return (
        <div className='flex flex-col gap-y-2 bg-white  max-w-full w-full rounded-lg overflow-clip pb-5 '>
        <div className='flex border border-gray-50 bg-white max-w-full max-lg:flex-col max-lg:items-start max-lg:gap-y-3 w-full justify-between items-center p-3 '>
        <h1 className='font-bold max-lg:text-sm max-md:text-xs text-nowrap'>Doctors Overview</h1>
        <div className='flex w-full justify-end max-lg:flex-col max-lg:items-start max-lg:gap-y-3 max-w-full gap-x-4 items-center'>
        <div className='flex max-w-full max-lg:w-full  items-center gap-x-4 bg-gray-100 p-3 rounded-md'>
        <svg className='bi bi-search fill-gray-500' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input value={search ? search : ""} onChange={(event)=>{
            setSearch(event.target.value);
            if(!isSearchTriggered){
                setIsSearchTriggered(true);
            }
        }} className='max-w-full text-xs text-gray-950 font-bold outline-none relative ' type="text" placeholder='Search...' />
        </div>

        <div className='flex gap-x-5'>
        <div className='relative bg-white'>
            <button onClick={()=>{
                setShouldShowSpecialityOptions(!shouldShowSpecialityOptions);
            }} className='outline-none flex items-center gap-x-3  cursor-pointer rounded-md border border-gray-500  px-4 max-md:px-3 py-2 hover:opacity-50 duration-500'>
            <p className='text-xs text-gray-800 font-bold'>{filter.specialty || 'Specialty'}</p>
            <svg className='bi bi-chevron-dowm' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
            </button>
            {shouldShowSpecialityOptions
            &&
            <div className='absolute z-30 left-1/2 transform-[translateX(-50%)] border border-gray-100 shadow-sm text-xs text-nowrap  flex flex-col items-start gap-y-2 text-gray-700 font-bold bg-white p-2 rounded-sm'>
                <button className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start' onClick={()=>{
                    setFilter({...filter,specialty:null});
                    handleFilter();
                    setShouldShowSpecialityOptions(false);
                }}>All</button>
                {getSpecialties()}
            </div>
            }
        </div>

        <div className='relative flex items-center gap-x-3 bg-white px-4 py-2 max-md:px-2  rounded-md border border-gray-500'>
        <button onClick={()=>{
            setShouldShowJoiningDateOptions(!shouldShowJoiningDateOptions);
        }} className='flex gap-x-2 items-center text-xs text-gray-800 font-bold cursor-pointer hover:opacity-50 duration-500 outline-none text-nowrap   '>
        {filter.joiningDate || 'All Time'}
        <svg className='bi bi-chevron-down' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg>
        </button>
        
        {shouldShowJoiningDateOptions
        &&
        <div className='absolute z-30 left-1/2 transform-[translateX(-50%)] border border-gray-100 shadow-sm text-xs text-nowrap flex flex-col items-start gap-y-2 text-gray-700 font-bold bg-white p-2 rounded-sm -bottom-43 '>
             <button onClick={()=>{
                setFilter({...filter,joiningDate:''})
                setShouldShowJoiningDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>All Time</button>
            <button onClick={()=>{
                setFilter({...filter,joiningDate:'Last 12 Months'})
                setShouldShowJoiningDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last 12 Months</button>
            <button onClick={()=>{
                setFilter({...filter,joiningDate:'Last 6 Months'})
                setShouldShowJoiningDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last 6 Months</button>
            <button onClick={()=>{
                setFilter({...filter,joiningDate:'Last 3 Months'})
                setShouldShowJoiningDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last 3 Months</button>
            <button onClick={()=>{
                setFilter({...filter,joiningDate:'Last Month'})
                setShouldShowJoiningDateOptions(false);
            }} className='hover:bg-gray-100 duration-500 cursor-pointer p-1 rounded-sm w-full flex items-start'>Last Month</button>
        </div>

        }
        </div>

        </div>

    
        </div>
        </div>
        <DoctorsList allDoctors={allDoctors} doctors={doctors} setAllDoctors={setAllDoctors}></DoctorsList>
        </div>
        )
    }
}

export default DoctorsOverview
