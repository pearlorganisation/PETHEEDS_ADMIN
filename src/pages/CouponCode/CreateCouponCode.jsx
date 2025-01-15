import React, { useEffect } from 'react'
import { createCouponCode } from '../../features/actions/couponCode';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';

export const CreateCouponCode = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { couponCodeData, isLoading } = useSelector((state) => state.couponCode);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        dispatch(createCouponCode(data));
      };

      useEffect(()=>{
     if(couponCodeData.status)
    {navigate("/couponCode")}
            },[couponCodeData])

    return (
        <div>
          <div className="bg-gray-800">
            <div className=" flex justify-center">
              <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
                Create Coupon Code details
              </h3>
            </div>
            <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
              <form
                className="space-y-6 mx-8 sm:mx-2"
                onSubmit={handleSubmit(onSubmit)}
              >
   
                <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
                <div className="w-full">
                    <label className="font-medium">Coupon Code</label>
                    <input
                      {...register('couponCode', { required: 'Coupon Code is required' })}
                      type="text"
                      className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                      onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                    />
                    {errors.couponCode && (
                      <span className="text-red-500">
                       Coupon Code is required
                      </span>
                    )}
                  </div>
          
                </div>
                <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
                <div className="w-full">
                    <label className="font-medium">Minimum Amount</label>
                    <input
                      {...register('minAmount', { required: 'Minimum Amount is required' })}
                      type="number"
                      className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                    />
                    {errors.minAmount && (
                      <span className="text-red-500">
                      Minimum Amount is required
                      </span>
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
                        type="number"
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
}

