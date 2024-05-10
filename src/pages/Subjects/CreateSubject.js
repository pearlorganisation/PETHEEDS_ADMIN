import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { createSubject } from "../../features/actions/subject";





const CreateSubject = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {subjectData,isLoading} = useSelector((state)=>state.subject)

    const {register,handleSubmit,formState: { errors },}=useForm({
        defaultValues:{
        subject:"",
        }
        })

        const onSubmit = data =>{
            console.log('data',data)
            dispatch(createSubject(data))
            
          }
       
          useEffect(() => {
            if(subjectData?.status){
              navigate("/subject")
            }
          }, [subjectData]);

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create subject details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
        
          
            <label className="font-medium">Subject</label>
            <input 
            {...register('subject', { required: 'Subject is required' })}
              type="text"
              className="w-full mt-2 me-35 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.subject && (
                    <span className="text-red-500">
                      Subject is required
                    </span>
                  )}
        
        
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full btn-grad:hover btn-grad">
              {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Create</>)}
              </button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreateSubject