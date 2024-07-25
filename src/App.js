import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import OtpVerification from './pages/Authentication/OtpVerification';
import Loader from './common/Loader';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';
import { useSelector } from 'react-redux';
import MailSent from './pages/Authentication/MailSent';
import ChangePassword from './pages/Authentication/ChangePassword';

// ----------------------------------------------------------------------

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const { isUserLoggedIn, isLoading, isOtpSentSuccessfully, isOtpVerified } =
    useSelector((state) => state.auth);
  console.log(isUserLoggedIn, '::::isuser::::loggedin::');
  //
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []); 

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
        {/* Non Protected Routes  */}
        <Route
          path="/auth/signin"
          element={isUserLoggedIn ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/auth/signup"
          element={isUserLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/auth/changePassword"
          element={
            !isUserLoggedIn && isOtpVerified ? (
              <ChangePassword />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/auth/otp"
          element={
            !isUserLoggedIn && isOtpSentSuccessfully ? (
              <OtpVerification />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/auth/reset"
          element={isUserLoggedIn ? <Navigate to="/" /> : <MailSent />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<DefaultLayout />}>
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
