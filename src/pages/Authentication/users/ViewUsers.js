// AdminPanel.js

import React, { useEffect, useState } from 'react';
import Delete from '../../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import icons from React Icons library
import { deleteUser, getAllUsers } from '../../../features/actions/user';



const ViewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async()=>{
      try{
        dispatch(getAllUsers());
      }
      catch(error){
       console.error("Error fetching users:",error)
      }
    }
    fetchData();
  }, [dispatch]);
 

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteUser(id));
    dispatch(getAllUsers());
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  }; 
  const handleAddUser = () => {
    navigate('/createUser');
  };
  const { userData, isLoading } = useSelector((state) => state.user);
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Users
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              onClick={handleAddUser}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add User
            </a>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Phone Number</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {isLoading ? (
                <p>Loading hra h bhai</p>
              ) : (
                userData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {item?.userName}
                    </td>
                   
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.phoneNumber}
                    </td>
                   
                    <td className="text-right px-6 whitespace-nowrap">
                     
                      <button
                        onClick={() => {
                          handleModal(item?._id);
                        }}
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
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

export default ViewUser;
