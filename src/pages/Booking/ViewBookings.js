import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Stack, Skeleton } from '@mui/material';
import {
  getAllBookings,
  updateOrderCompletion,
} from '../../features/actions/booking';
import ViewModalBookings from './ViewModalBookings';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import { useSearchParams, useLocation } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';

const ViewBookings = () => {
  const { bookingData, isLoading } = useSelector((state) => state.booking);
  const { search } = useLocation();
  const dispatch = useDispatch();
  const [approval, setApproval] = useState({});
  const [searchBox, setSearchBox] = useState('');
  const [filter, setFilter] = useState('');

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState();

  const handleViewModal = (itemData) => {
    setShowViewModal(true);
    setViewData(itemData);
  };

  const itemsPerPage = 10;
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: itemsPerPage,
  });

  const [page, setPage] = useState(searchParams.get('page') || 1);
  const pageCount = bookingData?.totalPages;

  const handlePagination = (e, p) => {
    setPage(p);
    setSearchParams({ page: p, limit: itemsPerPage });
  };

  const handleChange = (event, orderId) => {
    const value = event.target.value;
    setApproval((prevApproval) => ({
      ...prevApproval,
      [orderId]:
        value === 'Pending'
          ? null
          : value === 'Completed'
          ? 'Completed'
          : 'Cancelled',
    }));
  };

  const handleSubmit = (event, orderId) => {
    event.preventDefault();
    dispatch(
      updateOrderCompletion({ orderId, isCompleted: approval[orderId] })
    );
  };

  useEffect(() => {
    if (Array.isArray(bookingData?.data) && bookingData?.data?.length > 0) {
      const initialApproval = {};
      bookingData?.data?.forEach((item) => {
        initialApproval[item._id] =
          item.orderStatus !== null ? item.orderStatus : null;
      });
      setApproval(initialApproval);
    }
  }, [bookingData]);

  const getBookings = () => {
    dispatch(
      getAllBookings({
        search: search || `?page=1&limit=${itemsPerPage}`,
        _id: `&_id=${searchBox}`,
        orderStatus: `&orderStatus=${filter}`,
      })
    );
  };

  useEffect(() => {
    getBookings();
  }, [page, filter]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="justify-between md:flex">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Manage Orders
          </h3>
          <div className="flex  items-center justify-center rounded-lg ">
            <select
              value={filter === '' ? '' : filter}
              onChange={(e) => setFilter(e.target.value)}
              className="py-2 pl-3 pr-10 text-sm text-gray-600  rounded-lg  shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
            >
              <option value="" hidden>
                Filter By Order Status
              </option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="-translate-x-6">
              {' '}
              <MdOutlineArrowDropDownCircle className="" />
            </div>
            <button
              onClick={() => setFilter('')}
              className="text-xs bg-red-600 hover:bg-red-500 px-2 py-1 rounded-lg text-white font-semibold"
            >
              Remove
            </button>
          </div>
          <div className="flex justify-between items-center  ">
            <input
              onChange={(e) => {
                setSearchBox(e.target.value);
              }}
              className="bg-white py-[6px] px-2 w-64  rounded-s-lg  outline-none"
              placeholder="Search Order Id"
            ></input>
            <div
              onClick={() => {
                getBookings();
              }}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer  text-white rounded-e-lg  py-[10px] px-3 k font-semibold"
            >
              <IoSearchOutline />
            </div>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3  px-2">Order ID</th>
                <th className="py-3 px-2">Customer Name</th>
                <th className="py-3 px-2">Order Date</th>
                <th className="py-3 px-2">Order Amount</th>
                <th className="py-3 px-2">Order Type</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-8">
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
                Array.isArray(bookingData?.data) &&
                bookingData?.data?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-4 whitespace-nowrap">{item?._id}</td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {item?.orderById?.fullName}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {format(new Date(item?.createdAt), 'EEE, d MMM yyyy')}
                    </td>
                    <td className="px-2 text-center py-4 whitespace-nowrap">
                      ₹ {item?.amount}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <span
                        className={`rounded-md bg-white p-1 font-semibold ${
                          item?.paymentType === 'Online Paid'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {item?.paymentType}
                      </span>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <form
                          onSubmit={(e) => handleSubmit(e, item._id)}
                          className="flex items-center space-x-2"
                        >
                          <select
                            value={
                              approval[item._id] !== undefined
                                ? approval[item._id] === 'Completed'
                                  ? 'Completed'
                                  : approval[item._id] === 'Cancelled'
                                  ? 'Cancelled'
                                  : ''
                                : ''
                            }
                            onChange={(e) => handleChange(e, item._id)}
                            className="px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                          >
                            <option value="" disabled hidden>
                              Pending
                            </option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button
                            type="submit"
                            className="py-2 px-3 font-semibold text-blue-500 hover:text-blue-600 duration-150 hover:bg-gray-50 rounded-lg"
                          >
                            Save
                          </button>
                        </form>
                        <button
                          onClick={() => {
                            handleViewModal(item);
                          }}
                          className=" font-semibold text-green-500 hover:text-green-600 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          View
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
      <div className="flex justify-center mt-5">
        {' '}
        <Pagination
          count={pageCount}
          page={Number(page)}
          color="primary"
          onChange={handlePagination}
        ></Pagination>
      </div>

      {showViewModal && (
        <ViewModalBookings setModal={setShowViewModal} viewData={viewData} />
      )}
    </>
  );
};

export default ViewBookings;
