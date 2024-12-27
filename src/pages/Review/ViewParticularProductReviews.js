import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { approvalReview, deleteReview, getAllReviews, getParticularProductReviews } from '../../features/actions/review';
import { Stack, Skeleton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Tooltip from '@mui/material/Tooltip';

const ViewParticularProductReviews = () => {
  const { particularProductData, isDeleted, isLoading } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const { state: productId } = useLocation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  const [approval, setApproval] = useState({});

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

  const handleDelete = () => {
    dispatch(deleteReview(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleChange = (event, reviewId) => {
    const value = event.target.value;
    setApproval((prevApproval) => ({
      ...prevApproval,
      [reviewId]: value === '' ? null : value === 'true' ? true : false,
    }));
  };

  const handleSubmit = (event, reviewId) => {
    event.preventDefault();
    dispatch(approvalReview({ reviewId, approval: approval[reviewId] }));
  };

  useEffect(() => {
    dispatch(getParticularProductReviews(productId._id));
  }, [dispatch, productId._id]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllReviews());
    }
  }, [isDeleted, dispatch]);

  useEffect(() => {
    if (Array.isArray(particularProductData) && particularProductData.length > 0) {
      const initialApproval = {};
      particularProductData.forEach((item) => {
        initialApproval[item._id] = item.isApproved !== null ? item.isApproved : null;
      });
      setApproval(initialApproval);
    }
  }, [particularProductData]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            {productId?.productDetails?.productName}
          </h3>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-4 px-3">S.No.</th>
                <th className="py-4 px-3">Rating</th>
                <th className="py-4 px-3">User Name</th>
                <th className="py-4 px-3">Text Review</th>
                <th className="py-4 px-3">Review Images</th>
                <th className="py-4 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center px-6 py-8">
                    <Stack spacing={4}>
                      <Skeleton variant="rounded" height={30} />
                      <Skeleton variant="rounded" height={25} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                    </Stack>
                  </td>
                </tr>
              ) : (
                Array.isArray(particularProductData) &&
                particularProductData.length > 0 &&
                particularProductData.map((item, idx) => (
                  <tr key={idx} className="">
                    <td className="px-3 py-4 whitespace-nowrap truncate max-w-100">{idx + 1}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {Array(item?.rating)
                        .fill()
                        .map((_, index) => (
                          <StarIcon key={index} className="text-yellow-500 inline-block" />
                        ))}
                    </td>
                    <Tooltip title={item?.username} arrow><td className="cursor-pointer text-start px-3 py-4 max-w-34 truncate ">
                      {item?.username}{item?.isAdmin? <><br/><span className='bg-blue-600 rounded-md  px-1 text-white'>Admin Generated</span></> :""}</td>
                      </Tooltip>
                    <Tooltip title={item?.message} arrow>
                    <td className="text-start px-3 py-4 max-w-50 truncate cursor-pointer ">{item?.message}</td>
    </Tooltip> 
                    <td className="flex flex-wrap gap-3 px-3 py-4 whitespace-nowrap">
                      {item?.reviewImages?.length > 0 ? (
                        item?.reviewImages.map((img, idx) => (
                          <div key={idx} className="">
                            <img src={img} alt={`Gallery Image ${idx}`} className="rounded-lg h-16 w-18 mb-2" />
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-900 font-medium ">No Images</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="flex space-x-2">
                        <form onSubmit={(e) => handleSubmit(e, item._id)} className="flex items-center space-x-2">
                          <select
                            value={approval[item._id] !== undefined ? approval[item._id] === true ? 'true' : 'false' : ''}
                            onChange={(e) => handleChange(e, item._id)}
                            className="px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                          >
                            <option value="" disabled hidden>
                              Choose Approval
                            </option>
                            <option value="true">Approved</option>
                            <option value="false">Not Approved</option>
                          </select>
                          <button type="submit" className="py-2 px-3 font-semibold text-blue-500 hover:text-blue-600 duration-150 hover:bg-gray-50 rounded-lg">
                            Save
                          </button>
                        </form>
                        <button
                          onClick={() => {
                            handleModal(item?._id);
                          }}
                          className="py-2 leading-none px-3 font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />}
    </>
  );
};

export default ViewParticularProductReviews;
