import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteProduct, getAllProducts } from '../../features/actions/product';
import { Stack,Skeleton } from '@mui/material';
import ViewProductModal from './ViewProductModal';
import Pagination from '@mui/material/Pagination'
import { useSearchParams,useLocation } from 'react-router-dom';





const ViewProduct = () => {
  
  const { productData, isDeleted, isLoading } = useSelector((state) => state.product);
  const {search} = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsPerPage= 5;
  const[searchParams,setSearchParams]= useSearchParams({ page: 1, limit: itemsPerPage })

  const [page,setPage] = useState( searchParams.get("page") || 1)
  const pageCount= productData?.totalPages
// console.log(page,"::page")

  
  // useEffect(() => {
  //   console.log(search,"::search")
  // }, [search])
  
 

  useEffect(() => {
    const payload= {
      search: search || `?page=1&limit=${itemsPerPage}`
    }
   dispatch(getAllProducts(payload));
  }, [page]);

  useEffect(() => {
if(isDeleted){
  const payload= {
    page: page
  }
 dispatch(getAllProducts(payload));
}
  }, [isDeleted,page]);

const handlePagination = (e,p)=>{

  setPage(p)
  setSearchParams({ page: p, limit: itemsPerPage });
}
 
const [showViewModal,setShowViewModal] = useState(false)
const [viewData,setViewData]= useState()
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteProduct(id));

    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  }; 
  const handleAddProduct = () => {
    navigate('/createProduct');
  };
  const handleViewModal=(itemData)=>{
    setShowViewModal(true)
    setViewData(itemData)
  }

useEffect(()=>{
  setPage(searchParams.get("page"))
  // console.log(searchParams.get("page"))
},[])


  return (
    <>
      <div className="max-w-screen-xl ">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Products
            </h3>
            <p className="text-gray-600 mt-2">
            This page is for handle products by Create, Update and Delete
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              onClick={handleAddProduct}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Product
            </a>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6 ">Product Image </th>
                <th className="py-3 px-6 ">Category</th>
            
                <th className="py-3 px-6">Discount</th>
                <th className="py-3 px-6">Actions</th>
                
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
            {isLoading ? (
            <tr>
            <td colSpan="7" className="text-center px-6 py-8">
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
               Array?.isArray(productData?.data) && productData?.data?.length > 0 && productData?.data?.map((item, idx) =>{
                const serialNumber = (page - 1) * itemsPerPage + idx + 1;
                return (
                
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{serialNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {item?.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap min-w-25 min-h-20">
                      <img className='rounded-lg h-20 w-25' src={`${item?.productImg}`} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.category?.title}
                    </td>
                  
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.discount} %
                    </td>
                   
                    <td className=" whitespace-nowrap">
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
                          navigate(`/updateProduct/${item?._id}`, { state: item  });
                        }}
                        className="cursor-pointer py-2 px-3 font-semibold text-indigo-500 hover:text-indigo-600 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
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
                )})
              
              )}
            </tbody>
          </table>
        </div>
     <div className='flex justify-center mt-5'> <Pagination count={pageCount} page={Number(page)} color='primary' onChange={handlePagination}></Pagination></div>
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
      {showViewModal && (
        <ViewProductModal setModal={setShowViewModal} viewData={viewData} />
      )}
    </>
  );
};

export default ViewProduct;
