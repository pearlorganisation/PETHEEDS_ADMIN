// AdminPanel.js

import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteReview, getAllReviews } from '../../features/actions/review';
import { Stack,Skeleton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';





const ViewReviews = () => {
  const { reviewData, isDeleted, isLoading } = useSelector((state) => state.review);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  
  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
    }; 
      const handleDelete = () => {
        dispatch(deleteReview(id));
    
        setShowDeleteModal(false);
        setId('');
      };
  const handleAddReview = () => {
    navigate('/createReview');
  };


  useEffect(() => {
    dispatch(getAllReviews());
  
   }, []);
 
   useEffect(() => {
 if(isDeleted){
   dispatch(getAllReviews());
 }
   }, [isDeleted]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Reviews
            </h3>
            <p className="text-gray-600 mt-2">
            This page is for handle Reviews by Create, Update and Delete
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              onClick={handleAddReview}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Review
            </a>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Total Ratings</th>
                <th className="py-4 px-6">Total Reviews</th>
                <th className="py-4 px-6">Total Images</th>
                <th className="py-4 px-6">Actions</th>
              
                
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
            {isLoading ? (
            <tr>
            <td colSpan="5" className="text-center px-6 py-8">
              <Stack spacing={4}>
                <Skeleton variant="rounded" height={30} />
                <Skeleton variant="rounded" height={25}/>
                <Skeleton variant="rounded" height={20}/>
                <Skeleton variant="rounded" height={20}/>
                <Skeleton variant="rounded" height={20}/>
              </Stack>
            </td>
          </tr>
          ) : (
               Array.isArray(reviewData) && reviewData.length > 0 && reviewData?.map((item, idx) => (
                  <tr key={idx} className=''>
                
                    <td className="px-6 py-4 whitespace-nowrap truncate max-w-100">
                      {item?.productDetails?.productName}
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap ">
                      {item?.totalRatings}
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap ">
                      {item?.totalReviews}
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap">
                    {item?.totalImages}
                    </td>
                    
                   
                    <td className=" whitespace-nowrap">
                      <button
                        onClick={() => {
                          handleModal(item?._id);
                        }}
                        className="py-2 leading-none px-3 font-semibold text-green-500 hover:text-green-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Check Reviews
                      </button>
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
                ))
              
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default ViewReviews;
