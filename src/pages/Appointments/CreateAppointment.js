  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from 'react-redux';
  import { useForm, Controller } from "react-hook-form";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { createAppointment} from "../../features/actions/appointment";
  import { useNavigate } from "react-router-dom";
  import Select from 'react-select'
  import { ClipLoader } from "react-spinners";
  
 





  const CreateAppointment = () => {

    const {appointmentData,isLoading}= useSelector((state)=>state.appointment)
    const {subjectData}= useSelector((state)=>state.subject)
    const dispatch = useDispatch();
    const navigate=useNavigate()


      const {register,handleSubmit,control,formState: { errors },}=useForm({
          defaultValues:{
          name:"",
          email:"",
          date:"",
          subject:"",

          }
          })

          const onSubmit = data =>{
              console.log('data',data)
              const { name, email, date, subject,message } = data;
              const subjectValue = subject ? subject.value : ''; 
              const postData = {
                  name,
                  email,
                  date,
                  subject: subjectValue,
                  message
                  
              };
          dispatch(createAppointment(postData))
            }
        
            useEffect(() => {
              if(appointmentData?.status){
                navigate("/appointment")
              }
            }, [appointmentData]);
    

    return (
      <div>
          <div className="bg-gray-800">
        <div className=" flex justify-center">
          <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
            Create appointment details
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
    
          <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
            <div className="w-full">
              <label className="font-medium">Name</label>
              <input 
              {...register('name', { required: 'Name is required' })}
                type="text"
                
                className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.name && (
                    <span className="text-red-500">
                      Name is required
                    </span>
                  )}
            </div>
            <div className="w-full">
              <label className="font-medium">Email</label>
              <input
              {...register('email', { required: 'Email is required' })}
                type="text"
                
                className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.email && (
                    <span className="text-red-500">
                      Email is required
                    </span>
                  )}
            </div>
              </div>
              
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
            <div className="w-full">
              <label className="font-medium">Subject</label>
              <Controller 
                                      control={control}
                                      name="subject"
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              options={subjectData.map(subject => ({ value: subject?._id, label: subject.subject }))}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder="Choose subject "
                                             
                                              styles={{
                                                  control: (provided) => ({
                                                      ...provided,
                                                      border: '1px solid #CBD5E1', // Set custom border style
                                                      borderRadius: '0.400rem', // Set custom border radius
                                                      height: '40px', // Add height here
                                                  }),
                                                  placeholder: (provided) => ({
                                                      ...provided,
                                                      color: '#9CA3AF', // Set custom placeholder color
                                                  }),
                                              }}
 
                                          />
                                     )}
                                      rules={{ required: true }}
                                      
                                  />
                                  {errors?.subject && (
                                            <span className="text-red-500">
                                                Subject is required
                                            </span>
                                        )}
                                 
                    
            </div>
            <div className="w-full">
              <label className="font-medium">Date</label>
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
                placeholderText="Choose Date"
                autoComplete="off"
                calendarClassName="text-red-500"
                className="w-full mt-2 me-[200px] sm:me-[268px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                
              />
              
            )}
            rules={{required:true}}
            
          />
              {errors?.date && (
          <span className="text-red-500">
          Date is required
           </span>
           )}

            </div>
        
              </div>
            
 
            <div>
            <label className="block font-medium">Message</label>
    <textarea {...register('message', { required: 'Message is required' })} rows="5" class="block resize-none w-full mt-2 me-[250px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Leave a comment..."></textarea>
    {errors.message && (
                    <span className="text-red-500">
                      Message is required
                    </span>
                  )}
            </div>
          
          
            <div style={{ marginTop: '4rem' }}>
                <button className="w-full px-4 py-2 text-white bg-pink-700  font-medium hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
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

  export default CreateAppointment