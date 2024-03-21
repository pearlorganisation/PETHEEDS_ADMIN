import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { createBlog } from '../../features/actions/blog';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ReactTextEditor from '../../components/TextEditor/ReactTextEditor';

const CreateBlog = () => {
  const { blogData, isLoading } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Add event listener to each textarea on component mount
    document.querySelectorAll('textarea').forEach((textarea) => {
      textarea.addEventListener('input', resizeTextarea);
    });
    // Remove event listener on component unmount
    return () => {
      document.querySelectorAll('textarea').forEach((textarea) => {
        textarea.removeEventListener('input', resizeTextarea);
      });
    };
  }, []);
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
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    const { banner, ...rest } = data;
    formData.append('banner', banner[0]);
    formData.append('description', data.description);
    formData.append('topic', data.topic);
    console.log(data);
    dispatch(createBlog({ formData, rest }));
  };
  // Function to dynamically resize textarea
  const resizeTextarea = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const receiveTextEditorContent = (textEditorContent) => {
    if (textEditorContent) {
      console.log('Receive textEditorContent:: ', textEditorContent);
    }
  };

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

            <div>
              <label className="font-medium">Banner</label>
              <input
                {...register('banner', { required: 'topic is required' })}
                type="file"
                className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
              />
              {errors.banner && (
                <span className="text-red-500">Banner is required</span>
              )}
            </div>

            <div>
              <label className="font-medium">Description</label>
              <Controller
                name={`description`}
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <ReactTextEditor
                    sendContent={receiveTextEditorContent}
                    onChange={(data) => onChange(data)}
                    // existingTextEditorData={
                    //   examDescriptionsApiData?.description
                    // }
                  />
                )}
                rules={{ required: true }}
              />

              {errors?.description && (
                <span className="fw-normal fs-6 text-danger">
                  Exam Description is required
                </span>
              )}
            </div>

            <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white font-medium bg-pink-700 hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
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
