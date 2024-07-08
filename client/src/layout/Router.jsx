import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { TokenProvider } from "../context/AuthContext";
import Home from "../layout/Home";
import Profile from "../components/Profile";
import CreateForm from "../components/CreateForm";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const Layout = () => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <TokenProvider>
        <Outlet />
      </TokenProvider>
    </Auth0Provider>
  );
};

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile/:user",
        element: <Profile />,
      },
      {
        path: "profile/:user/create",
        element: <CreateForm />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={BrowserRouter} />;
}
