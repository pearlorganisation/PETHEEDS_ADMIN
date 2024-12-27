import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Select from 'react-select';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { createProduct } from '../../features/actions/product';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getAllBrands } from '../../features/actions/brand';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryData } = useSelector((state) => state.category);
  const { brandData } = useSelector((state) => state.brand);

  const { productData, isLoading } = useSelector((state) => state.product);

  const [selectedGallery, setSelectedGallery] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      price: [{ weight: '', price: '' }],
    },
  });

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control,
    name: 'price',
  });
  const onSubmit = (data) => {
    const { category, brand } = data;
    const categoryValue = category?.value;
    const brandValue = brand?.value;

    const formData = new FormData();
    formData.append('brand', brandValue);
    formData.append('productName', data?.productName);
    formData.append('productSlug', data?.productSlug);
    formData.append('category', categoryValue);
    // formData.append('newInStore', data?.newInStore);
    formData.append('price', JSON.stringify(data?.price));
    formData.append('discount', data?.discount);
    formData.append('about', data?.about);
    formData.append('description', data?.description);
    // Array.from(data?.productBanner).forEach((img) => {
    //   formData.append('productBanner', img);
    // });
    Array.from(data?.productImg).forEach((img) => {
      formData.append('productImg', img);
    });
    Array.from(data?.gallery).forEach((img) => {
      formData.append('gallery', img);
    });
    dispatch(createProduct(formData));
  };

  const [photo, setPhoto] = useState('');
  // const [banner, setBanner] = useState('');
  const defaultPhoto =
    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';

  const [gallery, setGallery] = useState([]);

  // const handleBannerChange = (e) => {
  //   const selectedPhoto = e.target.files[0];

  //   if (selectedPhoto) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(selectedPhoto);
  //     reader.onloadend = () => {
  //       setBanner(reader.result);
  //     };
  //   }
  // };
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

  useEffect(() => {
    if (productData?.status) {
      navigate('/product');
    }
  }, [productData]);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-gray-800">
        <div className=" flex justify-center">
          <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
            Create product details
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
          <form
            className="space-y-6 mx-8 sm:mx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                <label className="font-medium">Product Slug</label>
                <input
                  {...register('productSlug', {
                    required: 'Slug is required',
                    pattern: {
                      value: /^[^\\/]+$/, // Regular expression to disallow '/' and '\'
                      message: "Slug cannot contain '/' or '\\'",
                    },
                  })}
                  type="text"
                  className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                />
                {errors.productSlug && (
                  <span className="text-red-500">
                    {errors.productSlug.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="font-medium">Brand</label>
                <Controller
                  control={control}
                  name="brand"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      options={
                        Array.isArray(brandData) &&
                        brandData?.length > 0 &&
                        brandData?.map((item) => ({
                          value: item?._id,
                          label: item?.brand,
                        }))
                      }
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                      }
                      className="mt-2 "
                      placeholder="Choose Brand "
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
                {errors.brand && (
                  <span className="text-red-500">Brand is required</span>
                )}
              </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Category</label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      options={
                        Array.isArray(categoryData) &&
                        categoryData.length > 0 &&
                        categoryData.map((item) => ({
                          value: item?._id,
                          label: item?.title,
                        }))
                      }
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                      }
                      className="mt-2 "
                      placeholder="Choose Category "
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
                {errors.category && (
                  <span className="text-red-500">Category is required</span>
                )}
              </div>
              <div className="w-full">
                <label className="font-medium">Discount</label>
                <div className="flex gap-2">
                  <input
                    {...register('discount', {
                      pattern: {
                        value: /^(?:[1-9]|[1-9]\d|99)$/, // Regular expression for numbers from 1 to 99
                        message: 'Discount must be a number from 1 to 99',
                      },
                    })}
                    type="text"
                    className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                  />
                  <span className="font-bold mt-4">%</span>
                </div>
                {errors.discount && (
                  <span className="text-red-500">
                    {errors.discount.message}
                  </span>
                )}
              </div>
            </div>

            <div className="sm:flex sm:space-y-0 justify-between ">
              <label className="font-bold  text-black">Weight and Price </label>
              <button
                type="button"
                className=" border rounded-md  bg-pink-700 text-white font-semibold text-xl px-2 hover:bg-slate-950"
                onClick={() => appendPrice({ price: '' })}
              >
                +
              </button>
            </div>
            <ul>
              {priceFields.map((item, index) => (
                <li key={item.id}>
                  <div className="sm:flex gap-10 ">
                    <div className="w-full">
                      <input
                        {...register(`price.${index}.weight`, {
                          required: 'Weight is required',
                        })}
                        type="text"
                        placeholder=" Weight "
                        className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <input
                        {...register(`price.${index}.price`, {
                          required: 'Price is required',
                        })}
                        type="text"
                        placeholder=" Regular Price "
                        className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950"
                      type="button"
                      onClick={() => removePrice(index)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {errors.price && (
              <span className="text-red-500">Both Fields are required</span>
            )}

            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <div className="font-medium space-y-6">
                  {' '}
                  Product Image
                  <img
                    class="mt-2 w-20 h:20 sm:w-35 sm:h-35 rounded"
                    src={photo || defaultPhoto}
                    alt="No Image"
                  />
                  <label
                    htmlFor="file_input"
                    className="flex
            "
                  >
                    <InsertPhotoOutlinedIcon />
                    <div className="w-full px-2 border rounded-md border-slate-300 ">
                      Click here to upload
                    </div>
                  </label>
                  <input
                    {...register('productImg', {
                      required: 'Photo is required',
                      onChange: (e) => {
                        handlePhotoChange(e);
                      },
                    })}
                    className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                  />
                  {errors.productImg && (
                    <span className="text-red-500">
                      Image of Product is required
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="font-medium space-y-6 ">
                  {' '}
                  Gallery
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
                    {...register('gallery', {
                      required: 'Photo is required',
                      onChange: (e) => {
                        handleGalleryChange(e);
                      },
                    })}
                    className="hidden w-54 sm:w-[475px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="gallery_input"
                    type="file"
                    multiple
                  />
                  {errors.gallery && (
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
                <textarea
                  {...register('about', { required: 'About is required' })}
                  rows="6"
                  class="resize-none w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                  placeholder="Leave a comment..."
                ></textarea>
                {errors.about && (
                  <span className="text-red-500">
                    About of Product is required
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="font-medium">Description</label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  rows="6"
                  class="resize-none w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                  placeholder="Leave a comment..."
                ></textarea>
                {errors.description && (
                  <span className="text-red-500">
                    Description of Product is required
                  </span>
                )}
              </div>
            </div>

            {/* <div className="text-2xl text-black">
              New In Store section{' '}
              <span className="font-semibold text-sm">
                (Only if you want to display)
              </span>{' '}
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className=" w-full">
                <div className="font-medium space-y-6">
                  {' '}
                  New In Store Banner{' '}
                  <span className="text-sm text-black font-semibold">
                    (Image Size has to be 742 X 197 px){' '}
                  </span>
                  <img
                    class="mt-2 w-60 h:20 sm:w-[742px] sm:h-48 rounded"
                    src={banner || defaultPhoto}
                    alt="No Image"
                  />
                  <label
                    htmlFor="banner_input"
                    className="flex
             "
                  >
                    <InsertPhotoOutlinedIcon />
                    <div className="w-full px-2 border rounded-md border-slate-300 ">
                      Click here to upload
                    </div>
                  </label>
                  <input
                    {...register('productBanner', {
                      onChange: (e) => {
                        handleBannerChange(e);
                      },
                    })}
                    className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="banner_input"
                    type="file"
                  />
                </div>
              </div>
              <div className=" w-full">
                <div class="flex items-center mb-4">
                  <label
                    for="default-checkbox"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    New In Store
                  </label>
                  <input
                    {...register('newInStore')}
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="ms-2 me-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-black font-semibold">
                    (Check to display in New in Store){' '}
                  </span>
                </div>
              </div>
            </div> */}
            <div style={{ marginTop: '4rem' }}>
              <button className="w-full btn-grad:hover btn-grad">
                {isLoading ? <ClipLoader color="#c4c2c2" /> : <>Create</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
