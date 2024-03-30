import { lazy } from 'react';

// const Calendar = lazy(() => import('../pages/Calendar'));
// const Chart = lazy(() => import('../pages/Chart'));
// const FormElements = lazy(() => import('../pages/Form/FormElements'));
// const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
// const Tables = lazy(() => import('../pages/Tables'));
// const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
// const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
// ------------------------------------------------------------------------------

// New Routes

const ViewUsers = lazy(() => import('../pages/Authentication/users/ViewUsers'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const SignUp = lazy(() => import('../pages/Authentication/SignUp'));

const CreateRole = lazy(() =>
  import('../pages/Authentication/roles/CreateRole')
);
const ViewRoles = lazy(() => import('../pages/Authentication/roles/ViewRoles'));
const UpdateRole = lazy(() =>
  import('../pages/Authentication/roles/UpdateRole')
);

const CreatePermission = lazy(() =>
  import('../pages/Authentication/permissions/CreatePermission')
);
const ViewPermissions = lazy(() =>
  import('../pages/Authentication/permissions/ViewPermissions')
);
const UpdatePermission = lazy(() =>
  import('../pages/Authentication/permissions/UpdatePermission')
);
const CreateProduct = lazy(() => import('../pages/Products/CreateProduct'));
const ViewProducts = lazy(() => import('../pages/Products/ViewProducts'));
const UpdateProduct = lazy(() => import('../pages/Products/UpdateProduct'));
const CreateBlog = lazy(() => import('../pages/Blogs/CreateBlog'));
const ViewBlogs = lazy(() => import('../pages/Blogs/ViewBlogs'));
const UpdateBlog = lazy(() => import('../pages/Blogs/UpdateBlog'));
const CreateAppointment = lazy(() =>
  import('../pages/Appointments/CreateAppointment')
);
const ViewAppointments = lazy(() =>
  import('../pages/Appointments/ViewAppointments')
);

const CreateSubject = lazy(() => import('../pages/Subjects/CreateSubject'));
const ViewSubjects = lazy(() => import('../pages/Subjects/ViewSubjects'));
const UpdateSubject = lazy(() => import('../pages/Subjects/UpdateSubject'));
const ViewEnquiryRequests = lazy(() =>
  import('../pages/EnquiryRequests/ViewEnquiryRequest')
);

const ManageBlogs = lazy(() => import('../pages/Blogs/ManageBlogs'));

// ------------------------------------------------------------------------------
const coreRoutes = [
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },

  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },

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

  // Roles Routes
  {
    path: '/roles/createRole',
    title: 'Create Role',
    component: CreateRole,
  },
  {
    path: '/roles/viewRoles',
    title: 'View Roles',
    component: ViewRoles,
  },
  {
    path: '/roles/updateRole/:roleId',
    title: 'Update Product',
    component: UpdateRole,
  },
  // Products Routes
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

  // Permissions Routes
  {
    path: '/permissions/createPermission',
    title: 'Create Permission',
    component: CreatePermission,
  },
  {
    path: '/permissions/viewPermissions',
    title: 'View Permissions',
    component: ViewPermissions,
  },
  {
    path: '/permissions/updatePermission/:permissionId',
    title: 'Update Permission',
    component: UpdatePermission,
  },
  {
    path: '/blogs/viewBlogs',
    title: 'Manage Blogs',
    component: ManageBlogs,
  },
];

const routes = [...coreRoutes];
export default routes;
