import { Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Delete from '../../components/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllCouponCodes, updateCouponCode } from '../../features/actions/couponCode';

export const ViewCouponCode = () => {

    const dispatch = useDispatch();
    const {couponCodeData,isLoading,isUpdated}= useSelector((state)=>state.couponCode)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [id, setId] = useState();
  
  
    const handleDelete = () => {
      dispatch(updateCouponCode(id));
  
      setShowDeleteModal(false);
      setId('');
    };
  
    const handleModal = (ID) => {
      setShowDeleteModal(true);
      setId(ID);
    };

    useEffect(()=>{
dispatch(getAllCouponCodes())
    },[isUpdated])

  return (
    <>
    <div className="max-w-screen-xl ">
      <div className="justify-between md:flex">
    
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Manage Coupon Codes
          </h3>
        <div className="mt-3 md:mt-0">
          <Link
            to={"/createCouponCode"}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Coupon Code
          </Link>
        </div>
      </div>
      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Coupon Code</th>
              <th className="py-3 px-6 ">Minimum Amount</th>
              <th className="py-3 px-6">Discount</th>
              <th className="py-3 px-6">Actions</th>           
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
          {isLoading ? (
          <tr>
          <td colSpan="7" className="text-center px-6 py-8">
            <Stack spacing={4}>
              <Skeleton variant="rounded" height={30} />
              <Skeleton variant="rounded" height={25}/>
              <Skeleton variant="rounded" height={20}/>
              <Skeleton variant="rounded" height={20}/>
              <Skeleton variant="rounded" height={20}/>
            </Stack>
          </td>
        </tr>
        ) :  (
             Array?.isArray(couponCodeData) && couponCodeData?.length > 0 ? couponCodeData?.map((item, idx) =>{

              return (
              
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{idx+1}</td>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-70">
                    {item?.couponCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.minAmount}
                  </td>
                
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.discount} %
                  </td>
                 
                  <td className=" whitespace-nowrap">   
                    <button
                      onClick={() => {
                        handleModal(item?._id);
                      }}
                      className="py-2 leading-none px-3 font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )})
              : <div className='text-center py-2'>No Data Found</div>
            
            ) 
            }
          </tbody>
        </table>
      </div>

    </div>
    {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
  </>
  )
}
