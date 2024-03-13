import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const UpdateAppointment = () => {

    const {register,handleSubmit,reset,control}=useForm({
        defaultValues:{
        name:"",
        }
        })

        const onSubmit = data =>{
            console.log('data',data)
            reset({
             });
          }
       


  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Edit appointment details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex justify-between">
          <div>
            <label className="font-medium">Name</label>
            <input 
            {...register('name', { required: 'Name is required' })}
              type="text"
              required
              className="w-full mt-2 me-35 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <label className="font-medium">Email</label>
            <input
            {...register('price', { required: 'Price is required' })}
              type="text"
              required
              className="w-full mt-2 me-[228px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
            </div>
          <div className="sm:flex justify-between">
          <div>
            <label className="font-medium">Subject</label>
            <input 
            {...register('name', { required: 'Name is required' })}
              type="text"
              required
              className="w-full mt-2 me-[130px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <label className="font-medium block">Date</label>
            <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
              }}
              dateFormat="dd/MM/yyyy"
              className="w-full mt-2 me-[268px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          )}
        />

          </div>
            </div>
          
        
    
           
         
           
          <div>
          <label className="block font-medium">Message</label>
  <textarea rows="4" class="block resize-none w-full mt-2 me-[250px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Leave a comment..."></textarea>
          </div>
        
        
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white bg-pink-700  font-medium hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
                Update
              </button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default UpdateAppointment