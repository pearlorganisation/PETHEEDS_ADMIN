import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {useForm } from "react-hook-form";

import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { updateCategory } from "../../features/actions/category";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";



const UpdateCategory = () => {
const navigate=useNavigate()
  const dispatch = useDispatch();
const {state:item}= useLocation()
  const {categoryData,isLoading} = useSelector((state)=>state.category)


    const {register,handleSubmit,formState: { errors }}=useForm(
        {
            defaultValues:
            {title: item?.title|| ""}
        }
        )

        // const { fields: subTitleFields, append: appendSubTitle, remove: removeSubTitle } = useFieldArray({
        //   control,
        //   name: "subTitle"
        // });

        const onSubmit = data =>{
         
          const formData = new FormData()
          formData.append("title",data?.title)
        //  formData.append("subTitle",JSON.stringify(data?.subTitle))
          Array.from(data?.categoryImg).forEach((img) => {
          formData.append("categoryImg",img)
          })
         
      
          dispatch(updateCategory({id:item?._id,payload:formData}))
        
          }

          const [photo, setPhoto] = useState(item?.categoryImg || "");
          const defaultPhoto =
            "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
        
         
          
           const handlePhotoChange = (e) => {
                const selectedPhoto = e.target.files[0];
               
                if (selectedPhoto) {
                  
                  const reader = new FileReader();
                  reader.readAsDataURL(selectedPhoto);
                  reader.onloadend = () => {
                    setPhoto(reader.result);
                  };
                }
              };
              
           
              useEffect(() => {
                if(categoryData?.status){
                  navigate("/category")
                }
              }, [categoryData]);

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update category details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
     
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}  >
         
          <div className="w-full">
            <label className="font-medium">Category Title</label>
            <input 
            {...register('title',  {required:true})}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.title && (
                    <span className="text-red-500">
                      Title of Category is required
                    </span>
                  )}
          </div>
{/* 
          <div className="sm:flex space-y-6 sm:space-y-0 justify-between "> */}

          
{/* <label className="font-bold  text-black">Sub Category Title</label>
<button
type="button"
className=" border rounded-md  bg-pink-700 text-white font-semibold text-xl px-2 hover:bg-slate-950"
onClick={() => appendSubTitle("")}
>
+
</button> */}
{/* </div> */}
{/* <ul> */}
        {/* {subTitleFields.map((item, index) => (
          <li key={item.id}>
         
<div className="sm:flex gap-10 ">
<div className="w-full">

            <input
            {...register(`subTitle.${index}`)}
              type="text"
              placeholder=" Sub Category "
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
  
          </div>
          
         
          </div>
          { index>0 && (
            <button className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950" type="button" onClick={() => removeSubTitle(index)}>Delete</button>)
}
          </li>
          
        ))} */}
      {/* </ul> */}
            
          <div className="font-medium space-y-6"> Category Image 
             
             <img class="mt-2 w-full h-50  sm:w-100 sm:h-60 rounded" src={photo || defaultPhoto} alt="No Image"/>
             <label htmlFor="file_input" className="flex
             " ><InsertPhotoOutlinedIcon/>
             <div className=" px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
            
             <input
              {...register('categoryImg', {onChange:(e)=>{handlePhotoChange(e)} })}
            
              className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
             
             </div>
     
          
              <button className="w-full px-4 py-2 text-white bg-pink-700  font-medium hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150"
              >
              {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Update</>)}
              </button>
               
           
        </form>  
      </div>
    </div>
    </div>
  )
}

export default UpdateCategory