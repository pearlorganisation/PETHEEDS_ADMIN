import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ClipLoader } from 'react-spinners';
import { clearOtpVerified } from '../../features/slices/authenticationSlice';
import { resetPassword } from '../../features/actions/authenticationActions';



const ChangePassword = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch()
const {isPasswordReset,emailDataChangePassword,isLoading}= useSelector((state)=>state.auth)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
       const newData= {email:emailDataChangePassword.email,...data}
      
     dispatch(resetPassword(newData))
 
      };
      useEffect(()=>{
        // dispatch(clearOtpVerified())
        if(isPasswordReset){
          navigate("/auth/signin")
       }
      },[isPasswordReset])

    return (
        <div className="max-w-lg mx-auto my-20 bg-white p-8 rounded-xl shadow shadow-slate-300 py-10 ">
          <h1 className="text-4xl font-medium text-center">Change password</h1>
          <p className="text-slate-500 text-center">
            Fill up the form to reset the password
          </p>
    
          <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="my-10">
            <div className="flex flex-col space-y-5">
         
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-2">New Password</p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter new password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="text-[red]">This field is required</span>}
              </label>
              <label htmlFor="confirmPassword">
                <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter confirm password"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && <span className="text-[red]">This field is required</span>}
              </label>
    
              <button
                className="w-full py-3 font-medium rounded-lg text-white bg-[#1D4ED8] hover:shadow inline-flex space-x-2 items-center justify-center"
              
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
                {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<span>Change password</span>)}
                
              </button>
              <p className="text-center">
                {" "}
                <a
                  href="/auth/signin"
                  className="text-[#1D4ED8] font-medium inline-flex space-x-1 items-center"
                >
                  <span>Back to Login </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      );
}

export default ChangePassword