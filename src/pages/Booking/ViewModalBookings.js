import React from 'react'
import { format } from 'date-fns';

export default function ViewModalBookings ({viewData,setModal}) {
 

  return (
    <div
    className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
    aria-labelledby="header-3a content-3a"
    aria-modal="true"
    tabindex="-1"
    role="dialog"
  >
    {/*    <!-- Modal --> */}
    <div
      className="flex h-[90%] w-[80%] sm:w-[70%]  flex-col gap-6 overflow-hidden rounded bg-white p-6 shadow-xl "
      id="modal"
      role="document"
    >
      {/*        <!-- Modal header --> */}
      <header id="header-3a" className="flex items-center gap-4">
        <h3 className="flex-1 text-xl font-medium text-slate-700">
        Order Details
        </h3>
        <div>Order Date : {format(new Date(viewData?.createdAt), 'EEE, d MMM yyyy')} </div>
        <button
          onClick={() => setModal(false)}
          className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
          aria-label="close dialog"
        >
          <span className="relative only:-mx-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              role="graphics-symbol"
              aria-labelledby="title-79 desc-79"
            >
              <title id="title-79">Icon title</title>
              <desc id="desc-79">
                A more detailed description of the icon
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </header>
      {/*        <!-- Modal body --> */}
      <div id="content-3a" className="flex-1 overflow-auto space-y-10">

      <table className="w-full table-auto text-sm">
    <tbody className="text-gray-600">
      <tr>
        <td className="py-2 px-4 border border-gray-300">Order ID</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? viewData?._id : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Customer Name</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? viewData?.orderById?.fullName : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Products</td>
        <td className="py-2 px-4 border border-gray-300">{viewData && viewData.product ? (
            viewData.product.map((item, idx) => (
              <div className='border border-slate-300 flex mb-2 rounded-md px-2 gap-2' key={idx}>
                 <div className='flex items-center w-5'><span className=''>{idx+1} :</span> </div>
                 <div className='p-2 space-x-2 flex flex-wrap'>
              <span className='bg-slate-100 mb-2 rounded-md px-2 py-1 '>Product Name : {item?.productId[0]?.productName}</span>
              <span className='bg-slate-100 mb-2 rounded-md px-2 py-1 '>Size : {item?.weight}</span>
              <span className='bg-slate-100 mb-2 rounded-md px-2 py-1 '>Quantity : {item?.totalItem}</span>
              <span className='bg-slate-100 mb-2 rounded-md px-2 py-1'>Selling Price : ₹ {item?.price}</span>
           
              </div>
              </div>
            ))
          ) : (
            'No Price available'
          )}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Total order amount</td>
        <td className="py-2 px-4 border border-gray-300">{viewData?.amount}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Payment Mode</td>
        <td className="py-2 px-4 border border-gray-300 "> <span className={`rounded-md bg-white p-1 font-semibold ${viewData?.paymentType === 'Online Paid'? "text-green-600" : "text-yellow-600" }`}>{viewData?.paymentType}</span></td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-b-[1px] border-gray-300">Shipping Contact Number</td>
        <td className="py-2 px-4 border border-gray-300"><span className={`bg-slate-100 mb-2 rounded-md px-2 py-1`}>{viewData?.address?.phoneNumber || "Contact Number is removed."}</span></td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-b-[1px] border-gray-300">Shipping Address</td>
       { viewData?.address?.address ? <td className="py-2 px-4 border border-gray-300">{viewData?.address?.address} <br/>
        {viewData?.address?.locality}<br/>
        {viewData?.address?.city}, {viewData?.address?.state}<br/>
        {viewData?.address?.pincode} 
        </td> :   <td className="py-2 px-4 border border-gray-300"><span className={`bg-slate-100 mb-2 rounded-md px-2 py-1`}>Address is removed.</span></td>}
      </tr>
   

      

      
    </tbody>
  </table>
      </div>

</div>
</div>

  )
}
