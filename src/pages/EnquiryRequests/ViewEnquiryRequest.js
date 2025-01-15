// AdminPanel.js

import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteEnquiryRequest, getAllEnquiryRequests } from '../../features/actions/enquiryRequest';
import { Stack,Skeleton } from '@mui/material';
import ViewModalEnquiry from './ViewModalEnquiry';


const ViewEnquiryRequests = () => {
  const { enquiryRequestData, isLoading, isDeleted } = useSelector((state) => state.enquiryRequest);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEnquiryRequests());
   }, []);
 
   useEffect(() => {
 if(isDeleted){
   dispatch(getAllEnquiryRequests());
 }
   }, [isDeleted]);
 

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteEnquiryRequest(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  }; 

  const [showViewModal,setShowViewModal] = useState(false)
const [viewData,setViewData]= useState()

const handleViewModal=(itemData)=>{
  setShowViewModal(true)
  setViewData(itemData)
}

  
 
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Enquiry Requests
            </h3>
            <p className="text-gray-600 mt-2">
            People who have put enquiry requests. 
            </p>
          </div>
       
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Contact No.</th>
                <th className="py-3 px-6">Service</th>
             
               
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
            {isLoading ? (
            <tr>
            <td colSpan="4" className="text-center px-6 py-8">
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
            
               Array.isArray(enquiryRequestData) && enquiryRequestData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                  {item?.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap truncate max-w-30">
                    {item?.subject || "Enquiry"} 
                    </td>
                  
                    
                    <td className="text-right px-6 whitespace-nowrap">
                    <button
                        onClick={() => {
                         handleViewModal(item)
                        }}
                        className="py-2 px-3 font-semibold text-green-500 hover:text-green-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
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
         {showViewModal && (
        <ViewModalEnquiry setModal={setShowViewModal} viewData={viewData} />
      )}
    </>
  );
};

export default ViewEnquiryRequests;
