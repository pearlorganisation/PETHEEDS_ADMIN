// AdminPanel.js

import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAppointment,
  getAllAppointments,
} from '../../features/actions/appointment';
import { Stack, Skeleton } from '@mui/material';
import { createPortal } from 'react-dom';
import ViewDetails from './ViewDetails';

const ViewAppointments = () => {
  const { appointmentData, isLoading, isDeleted } = useSelector(
    (state) => state.appointment
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments());
  }, []);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllAppointments());
    }
  }, [isDeleted]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [singleData, setAppointmentData] = useState({});
  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteAppointment(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Appointments
            </h3>
            <p className="text-gray-600 mt-2">
              People who have made appointments can be shown here.
            </p>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6  text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-8">
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
                Array.isArray(appointmentData) && appointmentData.length > 0 ?
                appointmentData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.subject.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.date
                        ? new Date(item.date).toISOString().split('T')[0]
                        : ''}
                    </td>

                    <td className="text-center px-6 whitespace-nowrap ">
                      <button
                        onClick={() => {
                          setShowViewModal(true);
                          setAppointmentData(item);
                        }}
                        className="py-2 leading-none px-3 font-semibold text-blue-500 hover:text-blue-600 duration-150 hover:bg-gray-50 rounded-lg"
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
                )) : <div className=' p-2'>NO APPOINTMENTS DATA</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
      {showViewModal &&
        createPortal(
          <ViewDetails setShowViewModal={setShowViewModal} data={singleData} />,
          document.body
        )}
    </>
  );
};

export default ViewAppointments;
