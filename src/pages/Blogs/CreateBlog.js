import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { useForm,useFieldArray } from "react-hook-form";
import { createBlog } from "../../features/actions/blog";
import { useNavigate } from "react-router-dom";


const CreateBlog = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch();

  const {register,handleSubmit,formState: { errors },control,}=useForm({
    defaultValues:{
      topic:"",
      subTopics: [{ subTopic: "", description: "" }],
      conclusion:"",
      
    }
    })
    const { fields, append, remove } = useFieldArray({
      control,
      name: "subTopics"
    })
    const onSubmit = data =>{

      console.log(data)
      dispatch(createBlog(data));
    }
  // Function to dynamically resize textarea
  const resizeTextarea = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    // Add event listener to each textarea on component mount
    document.querySelectorAll("textarea").forEach(textarea => {
      textarea.addEventListener("input", resizeTextarea);
    });
    // Remove event listener on component unmount
    return () => {
      document.querySelectorAll("textarea").forEach(textarea => {
        textarea.removeEventListener("input", resizeTextarea);
      });
    };
  }, []);

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create blog details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
          
          
        
            <label className="font-medium">Topic</label>
            <input
            {...register('topic', { required: 'topic is required' })}
              type="text"
              
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
             {errors.topic && (
                    <span className="text-red-500">
                      Name of Topic is required
                    </span>
                  )}
        
            
          
            <div>
          
            </div>
            <div className="">
              <div className="flex justify-between">
            <label className="font-medium ">Sub Topic</label>
            <button
        type="button"
        className=" border rounded-md  bg-pink-700 text-white text-3xl px-2 hover:bg-slate-950"
        onClick={() => append({ subTopic: ""})}
      >
        +
      </button>
            </div>
            <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input className="w-full mt-2 px-5 sm:px-4 py-2 border-slate-300 text-gray-500 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" type="text"
             {...register(`subTopics.${index}.subTopic`)} placeholder="Sub topic"/>
              <textarea
                        className=" resize-none overflow-hidden w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                        {...register(`subTopics.${index}.description`)}
                        placeholder="Description"
                        rows="4"
                      />
            { index>0 && (
            <button className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950" type="button" onClick={() => remove(index)}>Delete</button>)
}
          </li>
          
        ))}
      </ul>
      {errors.subTopics && (
            <span className="text-red-500">
              Name of Product is required
            </span>
          )}
              </div>
              <div>
            <label className="font-medium">Conclusion</label>
            <textarea {...register('conclusion', { required: 'Conclusion is required' })} rows="4" class="overflow-hidden block resize-none w-full mt-2 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" placeholder="Leave a comment..."></textarea>
             {errors.conclusion && (
            <span className="text-red-500">
              Conclusion is required
            </span>
          )}
          </div>
         
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white font-medium bg-pink-700 hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
                Create
              </button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreateBlog