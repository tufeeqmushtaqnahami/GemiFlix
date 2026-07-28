import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoader from "./PageLoader";

const Login = lazy(() => import("./Login"));
const Browse = lazy(() => import("./Browse"));

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<PageLoader />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/Browse",
      element: (
        <Suspense fallback={<PageLoader />}>
          <Browse />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
