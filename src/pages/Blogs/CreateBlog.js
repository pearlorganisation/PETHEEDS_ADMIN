import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createBlog } from '../../features/actions/blog';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ReactTextEditor from '../../components/TextEditor/ReactTextEditor';

const CreateBlog = () => {
  const { blogData, isLoading } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [watchBannerName, setWatchBannerName] = useState({});

  useEffect(() => {
    if (blogData?.status) {
      navigate('/blog');
    }
  }, [blogData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    const { banner } = data;
    formData.append('banner', banner[0]);
    formData.append('description', data.description);
    formData.append('topic', data.topic);
    dispatch(createBlog({ formData }));
  };

  const temp = watch('banner');

  useEffect(() => {
    setWatchBannerName(temp);
  }, [temp]);

  return (
    <div>
      <div className="bg-gray-800">
        <div className=" flex justify-center">
          <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
            Create blog details
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
          <form
            className="space-y-6 mx-8 sm:mx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-medium">Topic</label>
            <input
              {...register('topic', { required: 'topic is required' })}
              type="text"
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            {errors.topic && (
              <span className="text-red-500">Topic is required</span>
            )}

            <div className="w-full">
              <label className="font-medium">Blog Slug</label>
              <input
                {...register('blogSlug', {
                  required: 'Slug is required',
                  pattern: {
                    value: /^[^\\/]+$/, // Regular expression to disallow '/' and '\'
                    message: "Slug cannot contain '/' or '\\'",
                  },
                })}
                type="text"
                className="w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.blogSlug && (
                <span className="text-red-500">{errors.blogSlug.message}</span>
              )}
            </div>

            <div className="flex-1 items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
              <div className="relative w-full space-y-1">
                <label htmlFor="input" className="font-medium ">
                  Banner
                </label>
                <div className="items-center justify-center  mx-auto">
                  <label
                    className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                    id="drop"
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="font-medium text-gray-600">
                        {Array.isArray(Array.from(watchBannerName || {})) &&
                        Array.from(watchBannerName || {}).length > 0
                          ? watchBannerName[0]?.name
                          : 'Drop files to Attach, or '}
                        <span className="text-blue-600 underline ml-[4px]">
                          browse
                        </span>
                      </span>
                    </span>
                    <input
                      type="file"
                      {...register('banner', { required: 'topic is required' })}
                      className="hidden"
                      accept="image/png,image/jpeg,image/webp"
                      id="input"
                    />
                  </label>
                </div>
                {errors.banner && (
                  <span className="text-red-500">Banner is required</span>
                )}
              </div>
            </div>

            <div>
              <label className="font-medium">Description</label>
              <Controller
                name={`description`}
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <ReactTextEditor onChange={(data) => onChange(data)} />
                )}
                rules={{ required: true }}
              />

              {errors?.description && (
                <span className="fw-normal fs-6 text-danger">
                  Description is required
                </span>
              )}
            </div>

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

export default CreateBlog;
