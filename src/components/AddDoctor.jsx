import React, { useContext } from 'react'
import { useState,useEffect,useRef} from 'react';
import Loading from './Loading';
import { AuthContext } from '../../context/AuthProvider';

const AddDoctor = ({setShouldAddDoctor,allDoctors,setAllDoctors,setActionStatus}) => {
     const [doctorDetailsInput,setDoctorDetailsInput]=useState({name:"",specialty:"",dateOfBirth:"",emailAddress:"",status:"active",countryCode:"91",contactNumber:"",profilePhoto:""});
     const [shouldShowStatusOptions,setShouldShowStatusOptions]=useState(false);
     const [imagePreview,setImagePreview]=useState(null);
     const imageInputRef=useRef(null);
     const formRef=useRef(null);
     const [profilePhoto,setProfilePhoto]=useState(null);
     const [isLoading,setIsLoading]=useState(false);
     const [isSubmissionAttempted,setIsSubmissionAttempted]=useState(false);
     const [error,setError]=useState('');
     const {userData,fetchWithAuth}=useContext(AuthContext);

     const handleSubmit=async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        const form=formRef.current;
        if(form.checkValidity()){
          await handleAddDoctor();
        }
        else{
          form.reportValidity();
        }
     }

     const generateRandomId=()=>{
      const currentIds=[];
      allDoctors.forEach((doctor)=>{
        currentIds.push(doctor.id);
      });


      let tempId=1;
      while(currentIds.includes(tempId)){
        tempId=Math.floor(Math.random()*allDoctors.length*2)
      }

      return tempId;

     }
 
     const handleAddDoctor=async()=>{
       if(error){
        setError('');
       }
       const data=doctorDetailsInput;
       data.userId=userData.id;
       if(profilePhoto){
         const imageUrl=await handleUploadImage();
         data.profilePhoto=imageUrl;
       }  

       try {
        const options={
          headers:{
                'Content-Type':"application/json",
           },
           credentials:'include',
           method:'POST',
           body:JSON.stringify(data)
         }
         const url='https://tectraclinic.onrender.com/doctors'
         const responseObj=await fetchWithAuth(url,options)
         const response=await responseObj.json();
         if(responseObj.status===201){
          data.id=generateRandomId();
          setActionStatus('Doctor Added Successfully')
          setAllDoctors([...allDoctors,data]);
          setIsLoading(false);
          setShouldAddDoctor(false);
         }
       } catch (error) {
         console.log(error)
         setIsLoading(false);
         setError('Unable to Add the Doctor.Please check and try again.');
       }
     }  
 
     const handleUploadImage=async ()=>{
         const formData=new FormData();
         formData.append("file",profilePhoto);
         formData.append('upload_preset','tectra_clinic');
         try{
           const response=await fetch('https://api.cloudinary.com/v1_1/desuv0tki/image/upload',{
             method:'POST',
             body:formData
           });
           const data=await response.json();
           return data.secure_url;
           
         }
         catch(error){
           console.log(error);
         }
     }
 
   return (
    <>
     <div className='fixed z-30 top-0 left-0 right-0 bottom-0 bg-black/90 flex items-center justify-center py-3 p-3'>
         <div className='fade-in flex flex-col gap-y-10 items-start bg-white px-1 rounded-lg text-sm h-full max-w-full font-bold overflow-y-auto hide-scrollbar'>
 
              <div className='bg-white z-20 pb-2 flex sticky top-0 w-full  max-w-full justify-center pt-1'>
              <button onClick={()=>{
                setShouldAddDoctor(false);
              }} className='absolute left-0 hover:bg-gray-50 duration-500 h-5 w-5 rounded-full flex items-center justify-center cursor-pointer '>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </button>

              <h1 className='pt-2'>Add Doctor</h1>

              </div>

              {error
              &&
              <p className='text-red-500 font-bold self-center text-wrap text-xs px-5'>{error}</p>
              }
             
             {  imagePreview ?
                <div className='h-32 w-32 flex flex-col gap-y-3 self-center max-w-full'>
                <img onClick={()=>{
                imageInputRef.current.click();
                }} className='rounded-full h-full w-full aspect-[1/1] object-cover hover:opacity-50 duration-500 cursor-pointer' src={imagePreview} alt="" />
                <button onClick={()=>{
                    setDoctorDetailsInput({...doctorDetailsInput,profilePhoto:''});  
                    setProfilePhoto(null);
                    setImagePreview(null);
                }} className=' cursor-pointer hover:opacity-50 duration-500 self-center p-1 ml-1 bg-white h-6 w-6 rounded-full border border-gray-50 flex items-center justify-center'>
                <svg className='fill-gray-600' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                </button>
                </div>
                :
                <span onClick={()=>{
                  imageInputRef.current.click();
                }} className='self-center p-2  flex items-center justify-center h-30 w-30 bg-gray-300 rounded-full hover:opacity-50 duration-500 cursor-pointer'>
                <svg className='bi bi-person-fill fill-gray-200  max-w-full ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                </span>
                
             }
             
 
             <input onChange={async (image)=>{
               const previewURL=URL.createObjectURL(image.target.files[0]);
               setImagePreview(previewURL);
               setProfilePhoto(image.target.files[0]);
             }} ref={imageInputRef} className='hidden' type="file" accept='image/*' />
 
             <p className='self-center'>Profile Picture</p>
 
 
             <form ref={formRef} onSubmit={(event)=>{
                  handleSubmit(event)
             }} className='flex flex-col gap-y-5 px-8  max-w-full'>
 
               <div className='flex flex-col  max-w-full gap-y-4'>
                   <label className='text-gray-700 font-bold' htmlFor="name">Name</label>
                   <input onChange={(event)=>{
                     setDoctorDetailsInput({...doctorDetailsInput,name:event.target.value})
                   }} id='name' className={`border border-gray-100  max-w-full shadow-sm pl-2 py-2 rounded-lg outline-none invalid:border-2 ${isSubmissionAttempted ? 'invalid:ring-2 invalid:ring-offset-2 invalid:ring-red-400 invalid:border-red-400' : ''}  duration-500`} value={doctorDetailsInput.name} required type="text" />
               </div>
 
               <div className='flex flex-col   max-w-fullmax-w-full gap-y-4'>
                   <label className='text-gray-700 font-bold' htmlFor="specialty">Specialty</label>
                   <input onChange={(event)=>{
                     setDoctorDetailsInput({...doctorDetailsInput,specialty:event.target.value})
                   }} id='specialty' className={`border border-gray-100  max-w-full shadow-sm pl-2 py-2 rounded-lg outline-none invalid:border-2 ${isSubmissionAttempted ? 'invalid:ring-2 invalid:ring-offset-2 invalid:ring-red-400 invalid:border-red-400' : ''}  duration-500`}  value={doctorDetailsInput.specialty} required type="text" />
               </div>
               
 
                 <div className='flex flex-col gap-y-4  max-w-full'> 
                     <label className='text-gray-700 font-bold' htmlFor="dateOfBirth">Date of Birth</label>    
                     <input type="date" onChange={(event)=>{
                       setDoctorDetailsInput({...doctorDetailsInput,dateOfBirth:event.target.value})
                     }} value={doctorDetailsInput.dateOfBirth} className={`border  max-w-full cursor-pointer border-gray-100 shadow-sm pl-2 py-2 rounded-lg outline-none invalid:border-2 ${isSubmissionAttempted ? 'invalid:ring-2 invalid:ring-offset-2 invalid:ring-red-400 invalid:border-red-400' : ''}  duration-500`} required /> 
                 </div>
 
                 <div className='flex flex-col gap-y-4  max-w-full'>
                     <label className='text-gray-700 font-bold' htmlFor="emailAddress">Email Address</label>    
                     <input onChange={(event)=>{
                       setDoctorDetailsInput({...doctorDetailsInput,emailAddress:event.target.value})
                     }} id='emailAddress' value={doctorDetailsInput.emailAddress} className={`border border-gray-100  max-w-full shadow-sm pl-2 py-2 rounded-lg outline-none invalid:border-2 ${isSubmissionAttempted ? 'invalid:ring-2 invalid:ring-offset-2 invalid:ring-red-400 invalid:border-red-400' : ''}  duration-500`} required type="email" />
                 </div>
 
               <div className='flex flex-col gap-y-4 w-full  max-w-full'>
               <label className='text-gray-700 font-bold' htmlFor="status">Status</label>    
               <div onClick={()=>{
                 setShouldShowStatusOptions(!shouldShowStatusOptions);
               }} className='relative  max-w-full flex justify-between items-center w-full border border-gray-50 rounded-lg shadow-sm px-2 py-2 cursor-pointer '>
                     <p>{doctorDetailsInput.status[0].toUpperCase()+doctorDetailsInput.status.slice(1)}</p>
                     <svg className='bi bi-chevron-down fill-gray-500 mt-1 ' xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                     </svg>
                     {
                       shouldShowStatusOptions &&
                       <div className='absolute -bottom-15 left-0  max-w-full right-0 border-2 border-gray-100 flex flex-col  gap-y-2 bg-white text-xs z-20 rounded-sm px-4 py-2'>
                       <button onClick={(event)=>{
                         event.preventDefault();
                         setDoctorDetailsInput({...doctorDetailsInput,status:'Inactive'});
                         setShouldShowStatusOptions(false);
                       }} className='text-gray-700 font-bold hover:opacity-50 duration-500 cursor-pointer w-full flex justify-start'>Active</button>
                       <button onClick={(event)=>{
                         event.preventDefault();
                         setDoctorDetailsInput({...doctorDetailsInput,status:'Active'});
                         setShouldShowStatusOptions(false);
                       }} className='text-gray-700 font-bold hover:opacity-50 duration-500 cursor-pointer w-full flex justify-start'>Inactive</button>
                       </div>
                     }
                     
               </div>
               </div>
                     
 
               <div className='flex gap-x-5 w-full  max-w-full'>
                 <div className='flex flex-col w-full gap-y-4  max-w-full'>
                     <label className='text-gray-700 font-bold max-w-full'>Contact Number</label> 
                     <div className='flex items-center w-full max-w-full border border-gray-50 rounded-lg shadow-sm pl-2 '>
                        <span className='text-gray-800  py-2 rounded-l-lg flex justify-center'>+</span>
                         <input onChange={(event)=>{
                         setDoctorDetailsInput({...doctorDetailsInput,countryCode:event.target.value})
                       }} id='countryCode' value={`${doctorDetailsInput.countryCode}`} className={` w-12  pl-2 py-2 border-r-gray-200 border-r outline-none ${isSubmissionAttempted ? 'invalid:border-2  invalid:ring-2 invalid:ring-offset-2 invalid:ring-red-400 invalid:border-red-400' : ''}  duration-500`} required type="tel" maxLength={3}/>
                       <input onChange={(event)=>{
                         setDoctorDetailsInput({...doctorDetailsInput,contactNumber:event.target.value})
                       }} id='contactNumber' value={doctorDetailsInput.contactNumber} className={`w-full pl-2 py-2 rounded-r-lg outline-none  ${isSubmissionAttempted ? 'invalid:border-2 invalid:ring-2 invalid:ring-offset-2 invalid:ring-red-400 invalid:border-red-400' : ''}  duration-500`} required type="tel" maxLength={12} />
                     </div>   
                 </div>
               </div>
 
               <button onClick={()=>{
                if(!isSubmissionAttempted){
                setIsSubmissionAttempted(true);
                }
               }}  type='submit' className='flex w-full  max-w-full justify-end text-gray-700 font-bold text-xs self-end cursor-pointer hover:opacity-50 duration-500 sticky bottom-0 right-0 py-4  bg-white'>Add Doctor</button>
             </form>
         </div>
     </div>
    {isLoading &&
    <Loading></Loading>
    }

     </>
   )
}

export default AddDoctor
