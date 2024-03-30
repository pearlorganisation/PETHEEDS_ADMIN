import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';
import { useSelector } from 'react-redux';


// ----------------------------------------------------------------------

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  
 const {isUserLoggedIn , isLoading} = useSelector((state)=>state.auth)
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

   // Function to handle login
  //  const handleLogin = async (userData) => {
  //   try {
  //     // Make API call to login
  //     const response = await loginUser(userData); // Example: loginUser is a function from your API file

  //     // Assuming the login API returns a success response
  //     if (response.success) {
  //       // Update isUserLoggedIn state to true
  //       setIsUserLoggedIn(true);
  //     } else {
  //       // Handle login failure, show error message etc.
  //     }
  //   } catch (error) {
  //     // Handle API call error
  //     console.error('Login API error:', error);
  //   }
  // };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Non Protected Routes  */}
          <Route
            path="/auth/signin"
            element={isUserLoggedIn ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/auth/signup"
            element={isUserLoggedIn ? <Navigate to="/" /> : <SignUp />}
          />
          <Route path="*" element={<PageNotFound />} />

          {/*  Protected Routes  */}
          <Route
            index
            element={
              isUserLoggedIn ? <Dashboard /> : <Navigate to="/auth/signin" />
            }
          />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    {isUserLoggedIn ? (
                      <Component />
                    ) : (
                      <Navigate to="/auth/signin" />
                    )}
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
