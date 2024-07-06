/* eslint-disable no-undef */
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { TokenProvider } from "../context/AuthContext";
import Home from "../layout/Home";

export default function Router() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  //layout
  const Layout = () => {

    return (
      <>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <TokenProvider>
            <Home />
          </TokenProvider>
        </Auth0Provider>
      </>
    );
  };

  //routes
  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   path: "/chat/:event",
        //   element: <ChatPage />,
        // },
        // {
        //   path: "/notificaciones",
        //   element: <NotificationsPage />,
        // },
        // {
        //   path: "/perfil/:user",
        //   element:<Profile/>,
        // }
      ],
    },
  ]);

  return <RouterProvider router={BrowserRouter} />;
}
