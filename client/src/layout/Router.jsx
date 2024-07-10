import { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { TokenProvider } from "../context/AuthContext";
import Home from "../layout/Home";
import Profile from "../components/Profile";
import CreateForm from "../components/CreateForm";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const Layout = () => {
  return (
    <>
    <Navbar />
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri: window.location.origin}}>
      <TokenProvider>
        <Suspense>
          <Outlet />
        </Suspense>
      </TokenProvider>
    </Auth0Provider>
    <Footer/>
    </>
  );
};

// más adelante quizas cambiamos las rutas a un solo componentes y dejamos que este componente solo sea el Layout de arriba 
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
        path: "perfil/:user",
        element: <Profile />,
      },
      {
        path: "perfil/:user/crear-evento",
        element: <CreateForm />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={BrowserRouter} />;
}
