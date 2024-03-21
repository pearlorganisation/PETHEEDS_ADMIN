import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm,useFieldArray } from "react-hook-form";
import { updateBlog } from "../../features/actions/blog";
import { useNavigate } from "react-router-dom";


const UpdateBlog = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch();

  const {register,handleSubmit,formState: { errors },control,}=useForm({
    defaultValues:{
      topic:"",
      subTopics: [{ subTopic: "" }],
      conclusion:"",
      
    }
    })
    const { fields, append, remove } = useFieldArray({
      control,
      name: "subTopics"
    })
    const onSubmit = data =>{
      console.log(data)
    }

  return (
    <div>
    <div className="bg-gray-800">
  <div className=" flex justify-center">
    <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
      Update blog details
    </h3>
  </div>
  <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
    <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:flex justify-between">
      <div>
        <label className="font-medium">Conclusion</label>
        <input 
        {...register('conclusion', { required: 'conclusion is required' })}
          type="text"
          
          className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
        />
      </div>
      <div className="mt-4 sm:mt-0">
        <label className="font-medium">Topic</label>
        <input
        {...register('topic', { required: 'topic is required' })}
          type="text"
          
          className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
        />
      </div>
        </div>
        <div className="sm:flex justify-between">
        <div>
      
        </div>
        <div className="">
          <div className="flex">
        <label className="font-medium sm:me-[316px]">Sub Topic</label>
        <button
    type="button"
    className=" border rounded-md bg-pink-700 text-white text-3xl px-2 hover:bg-slate-950"
    onClick={() => append({ name: ""})}
  >
    +
  </button>
        </div>
        <ul>
    {fields.map((item, index) => (
      <li key={item.id}>
        <input className="w-full mt-2 px-5 sm:px-4 py-2 border-slate-300 text-gray-500 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" type="text"
         {...register(`otherDetails.${index}.name`)}/>
        { index>0 && (
        <button className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950" type="button" onClick={() => remove(index)}>Delete</button>)
}
      </li>
    ))}
  </ul>
  
          </div>
      </div>
     
      <div style={{ marginTop: '4rem' }}>
          <button className="w-full px-4 py-2 text-white font-medium bg-pink-700 hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
            Create
          </button>
        </div>
    </form>
  </div>
</div>
</div>
  )
}

export default UpdateBlog