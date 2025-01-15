import { lazy } from 'react';
import createBanner from '../pages/Banners/createBanner';
import ViewBanners from '../pages/Banners/ViewBanners';
import ViewBrands from '../pages/Brand/ViewBrand';
import CreateBrand from '../pages/Brand/CreateBrand';
import UpdateBrand from '../pages/Brand/UpdateBrand';
import UpdateCategory from '../pages/Category/UpdateCategory';
import UpdateBanner from '../pages/Banners/updateBanner';
import ViewReviews from '../pages/Review/ViewReviews';
import CreateReview from '../pages/Review/CreateReview';
import { CreateCouponCode } from '../pages/CouponCode/CreateCouponCode';
import { ViewCouponCode } from '../pages/CouponCode/ViewCouponCode';





// ------------------------------------------------------------------------------

// New Routes

const ViewUsers = lazy(() => import('../pages/Authentication/users/ViewUsers'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const SignUp = lazy(() => import('../pages/Authentication/SignUp'));



const CreateProduct = lazy(() =>
  import('../pages/Products/CreateProduct')
);
const ViewProducts = lazy(() =>
  import('../pages/Products/ViewProducts')
);
const UpdateProduct = lazy(() =>
  import('../pages/Products/UpdateProduct')
);
const CreateBlog = lazy(() =>
  import('../pages/Blogs/CreateBlog')
);
const ViewBlogs = lazy(() =>
  import('../pages/Blogs/ViewBlogs')
);
const UpdateBlog = lazy(() =>
  import('../pages/Blogs/UpdateBlog')
);
const CreateAppointment = lazy(() =>
  import('../pages/Appointments/CreateAppointment')
);
const ViewAppointments = lazy(() =>
  import('../pages/Appointments/ViewAppointments')
);
const CreateCategory = lazy(() =>
  import('../pages/Category/CreateCategory')
);
const ViewCategory = lazy(() =>
  import('../pages/Category/ViewCategory')
);

const CreateSubject = lazy(() => import('../pages/Subjects/CreateSubject'));
const ViewSubjects = lazy(() => import('../pages/Subjects/ViewSubjects'));
const UpdateSubject = lazy(() => import('../pages/Subjects/UpdateSubject'));
const ViewEnquiryRequests = lazy(() =>
  import('../pages/EnquiryRequests/ViewEnquiryRequest')
);
const ViewBookings = lazy(() =>
  import('../pages/Booking/ViewBookings')
);
const ViewParticularProductReviews = lazy(() =>
  import('../pages/Review/ViewParticularProductReviews')
);



// ------------------------------------------------------------------------------
const coreRoutes = [
 
 
 
  {
    path: '/users',
    title: 'View Users',
    component: ViewUsers,
  },
  {
    path: '/auth/signin',
    title: 'Login',
    component: SignIn,
  },
  {
    path: '/auth/signup',
    title: 'Signup',
    component: SignUp,
  },

 
  {
    path: '/createProduct',
    title: 'Create Product',
    component: CreateProduct,
  },
  {
    path: '/product',
    title: 'View Products',
    component: ViewProducts,
  },
  {
    path: '/updateProduct/:id',
    title: 'Update Product',
    component: UpdateProduct,
  },
  // Blogs Routes
  {
    path: '/createBlog',
    title: 'Create Blog',
    component: CreateBlog,
  },
  {
    path: '/blog',
    title: 'View Blogs',
    component: ViewBlogs,
  },
  {
    path: '/updateBlog/:id',
    title: 'Update Blog',
    component: UpdateBlog,
  },
  // Appointments Routes
  {
    path: '/createAppointment',
    title: 'Create Appointment',
    component: CreateAppointment,
  },
  {
    path: '/appointment',
    title: 'View Appointments',
    component: ViewAppointments,
  },

  // EnquiryRequest Routes
  {
    path: '/enquiryRequest',
    title: 'View EnquiryRequests',
    component: ViewEnquiryRequests,
  },
  // Subjects Routes
  {
    path: '/createSubject',
    title: 'Create Subject',
    component: CreateSubject,
  },
  {
    path: '/subject',
    title: 'View Subjects',
    component: ViewSubjects,
  },
  {
    path: '/updateSubject/:id',
    title: 'Update Subject',
    component: UpdateSubject,
  },

  // Banner Routes
  {
    path: '/createBanner',
    title: 'Create Banner',
    component: createBanner,
  },
  {
    path: '/updateBanner/:id',
    title: 'Update Banner',
    component: UpdateBanner,
  },
  {
    path: '/banner',
    title: 'View Banners',
    component: ViewBanners,
  },
  

  // Category Routes
  {
    path: '/createCategory',
    title: 'Create Category',
    component: CreateCategory,
  },
  {
    path: '/updateCategory/:id',
    title: 'Update Category',
    component: UpdateCategory,
  },
  {
    path: '/category',
    title: 'View Category',
    component: ViewCategory,
  },
  // Brand Routes
  {
    path: '/createBrand',
    title: 'Create Brand',
    component: CreateBrand,
  },
  {
    path: '/updateBrand/:id',
    title: 'Update Brand',
    component: UpdateBrand,
  },
  {
    path: '/brand',
    title: 'View Brand',
    component: ViewBrands,
  },
  // Booking Routes

  {
    path: '/order',
    title: 'View Order',
    component: ViewBookings,
  },
  // Review Routes

  {
    path: '/review',
    title: 'View Review',
    component: ViewReviews,
  },
  {
    path: '/review/:id',
    title: 'View Particular Product Reviews',
    component: ViewParticularProductReviews,
  },
  {
    path: '/createReview',
    title: 'Create Review',
    component: CreateReview,
  },
  // coupon Code Routes

  {
    path: '/couponCode',
    title: 'View couponCode',
    component: ViewCouponCode,
  },
  {
    path: '/createCouponCode',
    title: 'Create couponCode',
    component: CreateCouponCode,
  },
  
];

const routes = [...coreRoutes];
export default routes;
