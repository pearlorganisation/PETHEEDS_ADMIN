import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { createProduct } from "../../features/actions/product";
import { useNavigate } from "react-router-dom";
import product from "../../features/slices/product";
import { ClipLoader } from "react-spinners";



const CreateProduct = () => {
const navigate=useNavigate()
  const dispatch = useDispatch();

  const {productData,isLoading} = useSelector((state)=>state.product)

const [selectedPhoto,setSelectedPhoto]=useState("")
const [selectedGallery,setSelectedGallery]=useState([])


    const {register,handleSubmit,formState: { errors },}=useForm({
        defaultValues:{
          productName:"",
          price:"",
          about:"",
          description:"",
        }
        })

        const onSubmit = data =>{
          console.log(data)
          const formData = new FormData()
          formData.append("productName",data?.productName)
          formData.append("price",data?.price)
          formData.append("about",data?.about)
          formData.append("description",data?.description)
          Array.from(data?.productImg).forEach((img) => {
          formData.append("productImg",img)
          })
          Array.from(data?.gallery).forEach((img) => {
            formData.append("gallery", img);
          });
        
          // console.log("formdata", formData.getAll('gallery'));
          // console.log("productImg", formData.getAll('productImg'));
          
          // console.log("gallery::",data?.gallery)
          // console.log("productImg::",data?.productImg)
          dispatch(createProduct(formData));
          
        
          }

          const [photo, setPhoto] = useState("");
          const defaultPhoto =
            "https://via.placeholder.com/130?text=No+Image+Selected";
        
            const [gallery, setGallery] = useState([]);
          
           const handlePhotoChange = (e) => {
                const selectedPhoto = e.target.files[0];
                setSelectedPhoto(e.target.files)
                if (selectedPhoto) {
                  
                  const reader = new FileReader();
                  reader.readAsDataURL(selectedPhoto);
                  reader.onloadend = () => {
                    setPhoto(reader.result);
                  };
                }
              };
              
              const handleGalleryChange = (e) => {
                const selectedImages = e.target.files;
            
                if (selectedImages.length > 0) {
                  // Create an array to store file objects
                  const imagesArray = [];
            
                  Array.from(selectedImages).forEach((image) => {
                    // Create a new File object
                    const fileObject = new File([image], image.name, {
                      type: image.type,
                    });
            
                    imagesArray.push(fileObject);
                  });
            
                  // Update the state with the array of file objects
                  setSelectedGallery((prevGallery) => [...prevGallery, ...imagesArray]);
            // Convert the file objects to base64 for UI display
    const base64Array = [];

    // Create a counter to keep track of when all images are processed
    let counter = 0;

    imagesArray.forEach((fileObject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onloadend = () => {
        base64Array.push(reader.result);

        // Increment the counter
        counter++;

        // Check if all images are processed
        if (counter === imagesArray.length) {
          // Update the state with the base64Array
          setGallery(base64Array
            );
        }
      };
    });
  }
};
              const removeImage = (index) => {
                setGallery((prevGallery) => {
                  const updatedGallery = [...prevGallery];
                  updatedGallery.splice(index, 1);
                  return updatedGallery;
                });
              };

              useEffect(() => {
                if(productData?.status){
                  navigate("/product")
                }
              }, [productData]);

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create product details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
     
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}  >
          <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Product Name</label>
            <input 
            {...register('productName', { required: 'Name is required' })}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.productName && (
                    <span className="text-red-500">
                      Name of Product is required
                    </span>
                  )}
          </div>
          <div className="w-full">
            <label className="font-medium">Price</label>
            <input
            {...register('price', { required: 'Price is required' })}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.price && (
                    <span className="text-red-500">
                      Price of Product is required
                    </span>
                  )}
          </div>
            </div>
          
          <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
          
            <div className="font-medium space-y-6"> Product Image 
             
            <img class="mt-2 w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo || defaultPhoto} alt="No Image"/>
            <label htmlFor="file_input" className="flex
            " ><InsertPhotoOutlinedIcon/>
            <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
           
            <input
             {...register('productImg', { required: 'Photo is required',onChange:(e)=>{handlePhotoChange(e)} })}
           
             className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
              {errors.productImg && (
                    <span className="text-red-500">
                      Image of Product is required
                    </span>
                  )}
            </div>
           
            </div>
          <div className="w-full">
          
            <div className="font-medium space-y-6 "> Gallery 
             <div className="flex mt-2 flex-wrap sm:h-[140px] overflow-auto">
            
             {gallery.map((image, index) => (
          <div key={index} className="relative mr-5">
           <div className="w-full mt-2"> <img
              className="w-20 h-20 sm:w-18 sm:h-16 mr-5 rounded cursor-pointer"
              src={image}
              alt={`Gallery Image ${index + 1}`}
              onClick={() => removeImage(index)}
            />
            </div>
            <div
              className="absolute top-0 right-0 px-1 cursor-pointer bg-rose-400 rounded-md hover:bg-red-600"
              onClick={() => removeImage(index)}
            >
              <span className="text-white text-sm">X</span>
            </div>
          </div>
        ))}
            </div>
    
            <label htmlFor="gallery_input" className="flex" >
    <InsertPhotoOutlinedIcon/>
    <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div>
  </label>
            <input
             {...register('gallery', { required: 'Photo is required',onChange:(e)=>{handleGalleryChange(e)} })}
             
             className="hidden w-54 sm:w-[475px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
             id="gallery_input" 
             type="file"
             multiple
             />
              {errors.gallery&& (
                    <span className="text-red-500">
                      Images of Product is required
                    </span>
                  )}
            </div>
            </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
          <label className="font-medium">About</label>
  <textarea {...register('about', { required: 'About is required' })}  rows="4" class="resize-none w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Leave a comment..."></textarea>
  {errors.about && (
                    <span className="text-red-500">
                      About of Product is required
                    </span>
                  )}
          </div>
          <div className="w-full">
          <label className="font-medium">Description</label>
          <textarea {...register('description', { required: 'Description is required' })} rows="4" class="resize-none w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Leave a comment..."></textarea>
          {errors.description && (
                    <span className="text-red-500">
                      Description of Product is required
                    </span>
                  )}
          </div>
          </div>
          <div style={{ marginTop: '4rem' }}>
          
              <button className="w-full px-4 py-2 text-white bg-pink-700  font-medium hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150"
              >
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

export default CreateProduct