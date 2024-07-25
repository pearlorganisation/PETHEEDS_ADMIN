import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useForm ,Controller} from "react-hook-form";

import Select from "react-select";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { createReview } from "../../features/actions/review";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getAllProducts } from '../../features/actions/product';
import { Rating } from "@mui/material";



const CreateReview = () => {
const navigate=useNavigate()
  const dispatch = useDispatch();

  const {reviewData,isLoading} = useSelector((state)=>state.review)
  const {productData} = useSelector((state)=>state.product)

    const {register,handleSubmit,formState: { errors },control}=useForm(
        )

        const onSubmit = data =>{
          const {product}= data
          const productValue= product?.value
          console.log(data)
          const formData = new FormData()
          formData.append("rating",data?.rating)
          formData.append("message",data?.message)
          formData.append("product",productValue)
        
          Array.from(data?.photo).forEach((img) => {
          formData.append("photo",img)
          })
         
          console.log("review", formData.getAll('review'));
          
          dispatch(createReview(formData))
        
          }

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
              
           
              useEffect(() => {
                if(reviewData?.status){
                  navigate("/review")
                }
              }, [reviewData]);

              useEffect(()=>{
                dispatch(getAllProducts( {
                  search: ""
                }));
              },[])

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create product review 
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
     
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}  >
         
        <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Product</label>
            <Controller 
                                      control={control}
                                      name="product"
                                      render={({ field }) => (
                                          <Select
                                              value={field.value}
                                              options={Array.isArray(productData?.data)&& productData?.data?.length> 0 && productData?.data?.map(item=> ({ value: item?._id, label: item?.productName }))}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder="Choose Product"
                                             
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
             {errors.product && (
                    <span className="text-red-500">
                      Product is required
                    </span>
                  )}
          </div>
          <div className="w-full flex flex-col gap-2 items-center">
            <label className="font-medium">Rating</label>

             <div className="">
        <Controller
          name="rating"
          control={control}
    
          defaultValue={5} 
          render={({ field }) => (
            <Rating
              {...field}
              value={field.value}
              
              onChange={(event, newValue) => {
                field.onChange(newValue);
              }}
              size="large"
            />
          )}
        />
      </div>
             {errors.rating && (
                    <span className="text-red-500">
                      Rating is required
                    </span>
                  )}
          </div>
       
         
            </div>
            
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full font-medium space-y-6"> Review Image (Optional)
             
             <img class="mt-2 w-full h-40  sm:w-47.5 sm:h-40 rounded" src={photo || defaultPhoto} alt="No Image"/>
             <label htmlFor="file_input" className="flex
             " ><InsertPhotoOutlinedIcon/>
             <div className=" px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
            
             <input
              {...register('photo', {onChange:(e)=>{handlePhotoChange(e)} })}
            
              className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
             
             </div>

             <div className="w-full">
          <label className="font-medium">Review</label>
  <textarea {...register('message', { required: true })}  rows="6" class="resize-none w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Please write product review here."></textarea>
  {errors.message && (
                    <span className="text-red-500">
                      Review of Product is required
                    </span>
                  )}
          </div>

             </div>
     
          
              <button className="w-full btn-grad:hover btn-grad"
              >
              {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Create</>)}
              </button>
               
           
        </form>  
      </div>
    </div>
    </div>
  )
}

export default CreateReview