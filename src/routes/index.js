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
    path: '/users/createUser',
    title: 'Create User',
    component: CreateUser,
  },
  {
    path: '/users/viewUsers',
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
    title: 'Update Role',
    component: UpdateRole,
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
