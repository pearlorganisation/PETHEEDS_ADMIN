import { useDispatch, useSelector } from "react-redux";
import CardFour from "../../components/CardFour.js";
import CardOne from "../../components/CardOne.js";
import CardThree from "../../components/CardThree.js";
import CardTwo from "../../components/CardTwo.js";

import { useEffect } from "react";

import { getAllAppointments} from "../../features/actions/appointment.js"
import { getAllEnquiryRequests } from "../../features/actions/enquiryRequest.js";
import { getAllBookings } from "../../features/actions/booking.js";
import { getAllProducts } from "../../features/actions/product.js";
import { Link } from "react-router-dom";
// ----------------------------------------------------------------------

const Dashboard = () => {
const dispatch = useDispatch()
  const {productData}= useSelector((state)=>state.product)
  const {appointmentData}= useSelector((state)=>state.appointment)
  const {enquiryRequestData}= useSelector((state)=>state.enquiryRequest)
  const {bookingData}= useSelector((state)=>state.booking)
 

  useEffect(()=>{
    const payload= {
      search: "",
      _id:"",
      orderStatus:""
    }
dispatch(getAllProducts({
  search: "",
    productName:"",
    category:""
  }))
dispatch(getAllAppointments())
dispatch(getAllEnquiryRequests())
dispatch(getAllBookings(payload))
  },[dispatch])
  
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to={"/order"}><CardFour data={bookingData?.data?.length}/></Link>
        <Link to={"/appointment"}><CardTwo data={appointmentData?.length}/></Link>
        <Link to={"/enquiryRequest"}> <CardThree data={enquiryRequestData?.length}/></Link>
        <Link to={"/product"}><CardOne data={productData?.length}/></Link>
 
       
        
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default Dashboard;
