import React, { useEffect ,useRef} from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";
import { generateLoginOTP, verifyOTP } from "../../features/actions/authenticationActions";
import { clearLoginUpState } from "../../features/slices/authenticationSlice";

const OtpVerfication = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate()
  const {isOtpVerified,emailDataChangePassword,isLoading}= useSelector((state)=>state.auth)

  const handleResendOtp= () =>{
dispatch(generateLoginOTP(emailDataChangePassword))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
     // Extract OTP values from the data object
     const otpValues = Object.values(data);
  

  // Concatenate OTP values into a single string
  const otpString = otpValues.join('');

  
  // Create a new object with the concatenated OTP string
  const otpData = { otp: otpString,email:emailDataChangePassword.email };

    dispatch(verifyOTP(otpData)) // You can handle OTP verification here

  };

  useEffect(()=>{
    // dispatch(clearLoginUpState())

    if(isOtpVerified){
      navigate("/auth/changePassword")
    }
  },[isOtpVerified])

  const fieldsRef = useRef()

   // Switch to input fields method
   const inputFocus = (e) => {
    const elements = fieldsRef.current.children
    const dataIndex = +e.target.getAttribute("data-index")
    if ((e.key === "Delete" || e.key === "Backspace")) {
        const next = dataIndex - 1;
        if (next > -1) {
            elements[next].focus()
        }
    } else {

        const next = dataIndex + 1
        if (next < elements.length && e.target.value != " " && e.target.value != "" && e.key.length == 1) {
            elements[next].focus()
        }
    }
}

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Otp Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-16">
                  <div  className="flex flex-row items-center justify-between mx-auto w-full max-w-s">
                    {/* You can use map to generate OTP input fields */}
                    <div ref={fieldsRef} className="mt-2 flex mx-auto items-center gap-x-2">
                    {[1, 2, 3, 4, 5, 6].map((item,index) => (
                    <input 
                    {...register(`otp${index}`, {
                      required: true,
                      minLength: 1,
                      maxLength: 1,
                      pattern: /^[0-9]*$/,
                    })}
                    type="text" data-index={index} placeholder="0"  className="w-12 h-12 rounded-lg border focus:border-indigo-600 outline-none text-center text-2xl"
                        
                        onKeyUp={inputFocus}
                        maxLength={1}
                    />
                 
                  ))}
                  </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#1D4ED8] border-none text-white text-sm shadow-sm"
                        type="submit"
                      >
                       {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Verify Account</>)}
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive code?</p>
                      <button
                      type="button"
                        className="flex flex-row items-center text-blue-600"
                        onClick={handleResendOtp}
                        
                      >
                        Resend
                      </button>
                      
                    </div>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerfication;
