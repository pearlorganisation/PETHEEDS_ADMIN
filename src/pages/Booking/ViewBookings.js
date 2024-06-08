
import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Stack,Skeleton } from '@mui/material';
import { getAllBookings } from '../../features/actions/booking';
import ViewModalBookings from './ViewModalBookings';
import { format } from 'date-fns';


const ViewBookings = () => {
  const { bookingData, isLoading, isDeleted } = useSelector((state) => state.booking);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showViewModal,setShowViewModal] = useState(false)
const [viewData,setViewData]= useState()

  const handleViewModal=(itemData)=>{
    setShowViewModal(true)
    setViewData(itemData)
  }

  useEffect(() => {
    dispatch(getAllBookings());
   }, []);
 
//    useEffect(() => {
//  if(isDeleted){
//    dispatch(getAllEnquiryRequests());
//  }
//    }, [isDeleted]);
 

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [id, setId] = useState();
//   const handleDelete = () => {
//     dispatch(deleteEnquiryRequest(id));
//     setShowDeleteModal(false);
//     setId('');
//   };

//   const handleModal = (ID) => {
//     setShowDeleteModal(true);
//     setId(ID);
//   }; 

  
 
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Orders
            </h3>
            <p className="text-gray-600 mt-2">
           This page is for view the orders of Online and Cash on delivery. 
            </p>
          </div>
       
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3  px-6">Order ID</th>
                <th className="py-3 px-6">Customer Name</th>
                <th className="py-3 px-6">Order Date</th>
                <th className="py-3 px-6">Order Amount</th>
                <th className="py-3 px-6">Order Type</th>
                <th className="py-3 px-6">Action</th>
               
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
            {isLoading ? (
            <tr>
            <td colSpan="6" className="text-center px-6 py-8">
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
            
               Array.isArray(bookingData) && bookingData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.orderById?.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(item?.createdAt), 'EEE, d MMM yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    {item?.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`rounded-md bg-white p-1 font-semibold ${item?.paymentType === 'Online Paid'? "text-green-600" : "text-yellow-600" }`}>{item?.paymentType}</span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                   
                    <button
                        onClick={() => {
                         handleViewModal(item)
                        }}
                        className=" font-semibold text-green-500 hover:text-green-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </button>
                      {/* <button
                        onClick={() => {
                          handleModal(item?._id);
                        }}
                        className="py-2 leading-none px-3 font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))
              
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )} */}
       {showViewModal && (
        <ViewModalBookings setModal={setShowViewModal} viewData={viewData} />
      )}
    </>
  );
};

export default ViewBookings;
