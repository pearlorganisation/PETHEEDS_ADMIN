// AdminPanel.js

import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

import { deleteSubject, getAllSubjects } from '../../features/actions/subject';
import { Stack,Skeleton } from '@mui/material';


const ViewSubjects = () => {
  const { subjectData, isDeleted, isLoading } = useSelector((state) => state.subject);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects());
   }, []);

   useEffect(() => {
 if(isDeleted){
   dispatch(getAllSubjects());
 }
   }, [isDeleted]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteSubject(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };
  const handleAddSubject = () => {
    navigate('/createSubject');
  };


  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Subjects
            </h3>
            <p className="text-gray-600 mt-2">
            This page is for handle subjects by Create, Update and Delete
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              onClick={handleAddSubject}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Subject
            </a>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b justify-between">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Subject Name</th>
                
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
            Array.isArray(subjectData) && subjectData.length > 0 && subjectData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{idx+1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.subject}
                    </td>

                    <td className="px-3 whitespace-nowrap">
                      <a
                        onClick={() => {
                          navigate(`/updateSubject/${item._id}`, { state: item });
                        }}
                        className="cursor-pointer py-2 px-3 font-semibold text-indigo-500 hover:text-indigo-600 duration-150 hover:bg-gray-50 rounded-lg
                        "
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => {
                          handleModal(item?._id);
                        }}
                        className="py-2 px-3 leading-none font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
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

export default ViewSubjects;
