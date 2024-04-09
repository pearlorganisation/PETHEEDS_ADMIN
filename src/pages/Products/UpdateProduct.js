import React, { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation,useNavigate } from 'react-router-dom';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { updateProduct } from "../../features/actions/product";
import { ClipLoader } from "react-spinners";


const UpdateProduct = () => {

  
  const dispatch = useDispatch();
  const { state: item } = useLocation();
  const {isLoading,productData} = useSelector((state)=>state.product)

  const navigate = useNavigate(); 
const [selectedPhoto,setSelectedPhoto]=useState("")
const [selectedGallery,setSelectedGallery]=useState([])

    const {register,handleSubmit,formState:{errors},}=useForm({
        defaultValues:{
          productName: item?.productName || "",
          price:item?.price ||"",
          discount:item?.discount ||"",
          about:item?.about ||"",
          description:item?.description ||"",
        }
        })

        const onSubmit = data =>{
          const formData = new FormData()
          formData.append("productName",data?.productName)
          formData.append("price",data?.price)
          formData.append("discount",data?.discount)
          formData.append("about",data?.about)
          formData.append("description",data?.description)
          Array.from(data?.productImg).forEach(img => {
          formData.append("productImg",img)
          })
          Array.from(data?.gallery).forEach((img) => {
            formData.append("gallery", img);
          });
        
          // console.log("gallery::",data?.gallery)
          // console.log("productImg::",data?.productImg)
          console.log("productName::", data?.productName)
          // console.log("formdata", formData.getAll('gallery'));
          // console.log("productImg", formData.getAll('productImg'));
          
         
          dispatch(updateProduct({id:item._id, payload:formData }));
          

          // const updatedData = {
          //   ...data,
          //   photo: selectedPhoto, // Use the state variable for the photo
          //   gallery: selectedGallery, // Use the state variable for the gallery
          // };
          //   console.log('update data',updatedData)
          
          }


          useEffect(()=>{
            if(productData?.status){
              navigate('/product')
            }
          },[productData])
         

          const [photo, setPhoto] = useState([item?.productImg?.path] ||"");
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
          setGallery(base64Array);
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



  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update product details
        </h3>
      </div> 
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
     <form className="space-y-6 mx-8 sm:mx-2 " onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium text-center">Product Name</label>
            <input 
            {...register('productName', { required: 'Name is required' })}
              type="text"
              
              className="w-full mt-2 me-35 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="w-full">
            <div className="flex gap-4">
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
                  <div>
                  <label className="font-medium">Discount</label>
                  <div className="flex gap-2">
            <input
            {...register('discount',{
              pattern: {
                value: /^(?:[1-9]|[1-9]\d|99)$/, // Regular expression for numbers from 1 to 99
                message: 'Discount must be a number from 1 to 99',
              }, })}
              type="text"
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            /><span className="font-bold mt-4">%</span></div>
             {errors.discount && (
                    <span className="text-red-500">
                      {errors.discount.message}
                    </span>
                  )}
                  </div>
                  </div>
          </div>
            </div>
          
          <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
          
            <div  className="font-medium space-y-6"> Product Image 
             
            <img class="mt-2 w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo || defaultPhoto} alt="No Image"/>
            <label htmlFor="file_input" className="flex 
            " ><InsertPhotoOutlinedIcon/>
            <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
           
            <input
             {...register('productImg',{onChange:(e)=>{handlePhotoChange(e)}})}
              
            //  onChange={handlePhotoChange}
             className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            </div>
            </div>
          <div className="w-full">
          
            <div  className="font-medium space-y-6"> Gallery 
             <div className="flex mt-2 flex-wrap sm:h-[140px] overflow-auto">
            
             {gallery.map((image, index) => (
          <div key={index} className="relative mr-5">
            <img
              className="w-20 h-20 sm:w-18 sm:h-16 mr-5 rounded cursor-pointer"
              src={image}
              alt={`Gallery Image ${index + 1}`}

              onClick={() => removeImage(index)}
            />
            <div
              className="absolute top-0 right-0 px-1 cursor-pointer bg-rose-400 rounded-md hover:bg-red-600"
              onClick={() => removeImage(index)}
            >
              <span className="text-white text-sm">X</span>
            </div>
          </div>
        ))}
            </div>
    
            <label htmlFor="gallery_input" className="flex " >
    <InsertPhotoOutlinedIcon/>
    <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div>
  </label>
            <input
             {...register('gallery',{onChange:(e)=>{handleGalleryChange(e)}})}
            //  onChange={handleGalleryChange}
             className="hidden w-54  border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="gallery_input" 
            
             type="file"
             multiple
             />
            </div>
            </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
          <label className="block font-medium">About</label>
  <textarea {...register('about', { required: 'About is required' })} rows="4" class="block resize-none w-full mt-2 me-[250px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Leave a comment..."></textarea>
          </div>
          <div className="w-full">
          <label className="block font-medium">Description</label>
          <textarea {...register('description', { required: 'Description is required' })} rows="4" class="block resize-none w-full mt-2 me-[270px] px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Leave a comment..."></textarea>
          </div>
          </div>
          <div style={{ marginTop: '4rem' }}>
              <button  className="w-full px-4 py-2 text-white bg-pink-700  font-medium hover:bg-slate-950 active:bg-pink-700 rounded-lg duration-150">
              {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Update</>)}
              </button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default UpdateProduct