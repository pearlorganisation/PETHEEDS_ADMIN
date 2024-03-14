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
const CreateUser = lazy(() =>
  import('../pages/Authentication/users/CreateUser')
);
const ViewUsers = lazy(() => import('../pages/Authentication/users/ViewUsers'));
const UpdateUser = lazy(() =>
  import('../pages/Authentication/users/UpdateUser')
);

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
const UpdateAppointment = lazy(() =>
  import('../pages/Appointments/UpdateAppointment')
);
const CreateSubject = lazy(() =>
  import('../pages/Subjects/CreateSubject')
);
const ViewSubjects = lazy(() =>
  import('../pages/Subjects/ViewSubjects')
);
const UpdateSubject = lazy(() =>
  import('../pages/Subjects/UpdateSubject')
);

// ------------------------------------------------------------------------------
const coreRoutes = [
  // {
  //   path: '/calendar',
  //   title: 'Calender',
  //   component: Calendar,
  // },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  // {
  //   path: "/forms/form-elements",
  //   title: "Forms Elements",
  //   component: FormElements,
  // },
  // {
  //   path: "/forms/form-layout",
  //   title: "Form Layouts",
  //   component: FormLayout,
  // },
  // {
  //   path: "/tables",
  //   title: "Tables",
  //   component: Tables,
  // },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  // {
  //   path: "/chart",
  //   title: "Chart",
  //   component: Chart,
  // },
  // {
  //   path: "/ui/alerts",
  //   title: "Alerts",
  //   component: Alerts,
  // },
  // {
  //   path: "/ui/buttons",
  //   title: "Buttons",
  //   component: Buttons,
  // },
  // ------------------------------------------------------------------------------

  // New Routes
  // Users Routes
  {
    path: '/users/createUser',
    title: 'Create User',
    component: CreateUser,
  },
  {
    path: '/users',
    title: 'View Users',
    component: ViewUsers,
  },
  {
    path: '/users/updateUser/:userId',
    title: 'Update User',
    component: UpdateUser,
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
  {
    path: '/updateAppointment/:id',
    title: 'Update Appointment',
    component: UpdateAppointment,
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
];

const routes = [...coreRoutes];
export default routes;
