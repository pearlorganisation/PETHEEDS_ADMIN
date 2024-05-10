import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { updateBanner } from "../../features/actions/banner";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";



const UpdateBanner = () => {
const navigate=useNavigate()
  const dispatch = useDispatch();
const {state:item} = useLocation()
  const {bannerData,isLoading} = useSelector((state)=>state.banner)


    const {register,handleSubmit,formState: { errors },}=useForm(
       {defaultValues:{
        title:item?.title
       }} )

        const onSubmit = data =>{
       
          const formData = new FormData()
          formData.append("title",data?.title)
        
          Array.from(data?.banner).forEach((img) => {
          formData.append("banner",img)
          })
          
          dispatch(updateBanner({id:item?._id,payload:formData}))
        
          }

          const [photo, setPhoto] = useState(item?.banner||"");
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
                if(bannerData?.status){
                  navigate("/banner")
                }
              }, [bannerData]);

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update banner details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
     
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}  >
         
          <div className="w-full">
            <label className="font-medium">Banner Title</label>
            <input 
            {...register('title',  {required:true})}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.title && (
                    <span className="text-red-500">
                      Title of Banner is required
                    </span>
                  )}
          </div>
            
          <div className="font-medium space-y-6"> Banner Image 
             
             <img class="mt-2 w-full h-50  sm:w-100 sm:h-60 rounded" src={photo || defaultPhoto} alt="No Image"/>
             <label htmlFor="file_input" className="flex
             " ><InsertPhotoOutlinedIcon/>
             <div className=" px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
            
             <input
              {...register('banner', {onChange:(e)=>{handlePhotoChange(e)} })}
            
              className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
          
             </div>
     
          
              <button className="w-full btn-grad:hover btn-grad"
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

export default UpdateBanner