import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useForm ,Controller} from "react-hook-form";
import Select from "react-select";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { createReview } from '../../features/actions/review';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getAllProducts } from '../../features/actions/product';
import { Rating } from "@mui/material";
import axios from "axios";




const CreateReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [randomName,setRandomName]= useState()
  const {reviewData,isLoading} = useSelector((state)=>state.review)
  const {productData} = useSelector((state)=>state.product)
  const {_id} = useSelector((state)=>state.auth.loggedInUserData.data)
  const { loggedInUserData } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [selectedGallery, setSelectedGallery] = useState([]);

  const [gallery, setGallery] = useState([]);

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

        const getRandomIndianName = async()=>{
          try {
            const {data} = await axios.get(`https://randomuser.me/api/?nat=in`)
            setRandomName(`${data.results[0].name.first} ${data.results[0].name.last}`)
          } catch (error) {
            console.log(error,"Err:")
          }
        
        }

        console.log(randomName)

        const onSubmit = data =>{
          const {product}= data
          const productValue= product?.value
          console.log(data)
          const formData = new FormData()
          
          formData.append("username",randomName)
          formData.append("rating",data?.rating)
          formData.append("message",data?.message)
          formData.append("product",productValue)
        
          Array.from(data?.reviewImages).forEach((img) => {
          formData.append("reviewImages",img)
          })
         
          console.log("review", formData.getAll('review'));
          
          dispatch(createReview(formData))
        
          }

  useEffect(() => {
    if (reviewData?.status) {
      navigate('/review');
    }
  }, [reviewData]);

              useEffect(()=>{
                getRandomIndianName()
                dispatch(getAllProducts( {
                  search: "",
                    productName:"",
                    category:""
                  }
                ));
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
          <form
            className="space-y-6 mx-8 sm:mx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Product</label>
                <Controller
                  control={control}
                  name="product"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      options={
                        Array.isArray(productData?.data) &&
                        productData?.data?.length > 0 &&
                        productData?.data?.map((item) => ({
                          value: item?._id,
                          label: item?.productName,
                        }))
                      }
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                      }
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
                  <span className="text-red-500">Product is required</span>
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
                  <span className="text-red-500">Rating is required</span>
                )}
              </div>
            </div>

            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full ">
                <div className="font-medium space-y-6 ">
                  {' '}
                  Review Images
                  <div className="flex mt-2 flex-wrap sm:h-[140px] overflow-auto">
                    {gallery.map((image, index) => (
                      <div key={index} className="relative mr-5">
                        <div className="w-full mt-2">
                          {' '}
                          <img
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
                  <label htmlFor="gallery_input" className="flex">
                    <InsertPhotoOutlinedIcon />
                    <div className="w-full px-2 border rounded-md border-slate-300 ">
                      Click here to upload
                    </div>
                  </label>
                  <input
                    {...register('reviewImages', {
                      onChange: (e) => {
                        handleGalleryChange(e);
                      },
                    })}
                    className="hidden"
                    id="gallery_input"
                    type="file"
                    multiple
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="font-medium">Review</label>
                <textarea
                  {...register('message', { required: true })}
                  rows="6"
                  class="resize-none w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                  placeholder="Please write product review here."
                ></textarea>
                {errors.message && (
                  <span className="text-red-500">
                    Review of Product is required
                  </span>
                )}
              </div>
            </div>

            <button className="w-full btn-grad:hover btn-grad">
              {isLoading ? <ClipLoader color="#c4c2c2" /> : <>Create</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
