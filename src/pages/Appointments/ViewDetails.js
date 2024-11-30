import React from 'react';
import { CalendarIcon, ClockIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function ViewDetails({ data, setShowViewModal }) {
  // In a real application, you would fetch this data from an API
  const appointment =
    Object.keys(data).length > 0
      ? data
      : {
          _id: '67486ab0f7d34ac5d70a7eed',
          name: 'Tiger',
          status: 'Pending',
          phoneNumber: 6398418091,
          email: 'abhishek@pearlorganisation.com',
          subject: {
            _id: '65f4105d5f080b2a7a777f01',
            subject: 'Dog behaviour',
            createdAt: '2024-03-15T09:09:49.927Z',
            updatedAt: '2024-03-15T09:09:49.927Z',
            __v: 0,
          },
          date: '2024-11-28T00:00:00.000Z',
          message: 'adfjkaksldjalskdjalksd',
          createdAt: '2024-11-28T13:05:52.342Z',
          updatedAt: '2024-11-28T13:05:52.342Z',
          __v: 0,
        };
  return (
    <div className="absolute bg-white/30 backdrop-blur z-999 top-0 w-full h-full grid place-items-center mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Appointment Details
            </h1>
            <button
              onClick={() => {
                setShowViewModal(false);
              }}
              type="button"
            >
              Close
            </button>
            {/* <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                appointment.status.toLowerCase() === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {appointment.status}
            </span> */}
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Appointment ID: {appointment._id}
          </p>
        </div>
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Client Information
            </h3>
            <p className="text-gray-600">{appointment.name}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4" />
              <span>{appointment.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MailIcon className="h-4 w-4" />
              <span>{appointment.email}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Appointment Details
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CalendarIcon className="h-4 w-4" />
              <span>{format(new Date(appointment.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ClockIcon className="h-4 w-4" />
              <span>{format(new Date(appointment.date), 'h:mm a')}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Subject</h3>
            <p className="text-gray-600">{appointment.subject.subject}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Message</h3>
            <p className="text-gray-600">{appointment.message}</p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          {/* <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit Appointment
          </button> */}
          {/* <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Confirm Appointment
          </button> */}
        </div>
      </div>
    </div>
  );
}
