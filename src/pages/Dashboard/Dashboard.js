import { useDispatch, useSelector } from "react-redux";
import CardFour from "../../components/CardFour.js";
import CardOne from "../../components/CardOne.js";
import CardThree from "../../components/CardThree.js";
import CardTwo from "../../components/CardTwo.js";
import ChartOne from "../../components/ChartOne.js";
import ChartThree from "../../components/ChartThree.js";
import ChartTwo from "../../components/ChartTwo.js";
import ChatCard from "../../components/ChatCard.js";
import MapOne from "../../components/MapOne.js";
import TableOne from "../../components/TableOne.js";
import { useEffect } from "react";
import { getAllProducts } from "../../features/actions/product.js";
import { getAllAppointments} from "../../features/actions/appointment.js"
import { getAllEnquiryRequests } from "../../features/actions/enquiryRequest.js";
import { getAllBlogs } from "../../features/actions/blog.js";
// ----------------------------------------------------------------------

const Dashboard = () => {
const dispatch = useDispatch()
  const {productData}= useSelector((state)=>state.product)
  const {blogData}= useSelector((state)=>state.blog)
  const {appointmentData}= useSelector((state)=>state.appointment)
  const {enquiryRequestData}= useSelector((state)=>state.enquiryRequest)
 

  useEffect(()=>{
dispatch(getAllProducts())
dispatch(getAllAppointments())
dispatch(getAllEnquiryRequests())
dispatch(getAllBlogs())
  },[dispatch])
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne data={productData?.length}/>
        <CardTwo data={appointmentData?.length}/>
        <CardThree data={enquiryRequestData?.length}/>
        <CardFour data={blogData?.length}/>
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
