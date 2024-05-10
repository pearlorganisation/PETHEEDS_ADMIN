import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { createBrand } from "../../features/actions/brand";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';




const CreateBrand = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {brandData,isLoading} = useSelector((state)=>state.brand)

    const {register,handleSubmit,formState: { errors },}=useForm()

        const onSubmit = data =>{
            const formData = new FormData()
            formData.append("brand",data?.brand)
            Array.from(data?.brandBanner).forEach((img) => {
              formData.append("brandBanner",img)
              })

            dispatch(createBrand(formData))
            
          }
       
          useEffect(() => {
            if(brandData?.status){
              navigate("/brand")
            }
          }, [brandData]);

          const [photo, setPhoto] = useState("");
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

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create brand details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
         <label className="font-medium">Brand</label>
            <input 
            {...register('brand', { required: 'Brand is required' })}
              type="text"
              className="w-full mt-2 me-35 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.brand && (
                    <span className="text-red-500">
                      Brand is required
                    </span>
                  )}
          </div>

          <div className="w-full">
          
            <div className="font-medium space-y-6"> Brand Banner 
             
            <img class="mt-2 w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo || defaultPhoto} alt="No Image"/>
            <label htmlFor="file_input" className="flex
            " ><InsertPhotoOutlinedIcon/>
            <div className="w-1/3 px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
           
            <input
             {...register('brandBanner', { required: 'Photo is required',onChange:(e)=>{handlePhotoChange(e)} })}
           
             className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
              {errors.productImg && (
                    <span className="text-red-500">
                      Image of Brand is required
                    </span>
                  )}
            </div>
           
            </div>
           
         
        
        
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full btn-grad:hover btn-grad ">
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

export default CreateBrand