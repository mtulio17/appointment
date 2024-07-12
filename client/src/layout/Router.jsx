// import { Auth0Provider } from "@auth0/auth0-react";
import { TokenProvider } from "../context/AuthContext";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Profile from "../components/Profile";
import CreateForm from "../components/CreateForm";
import Home from "../layout/Home";
//pages
import Settings from "../pages/Settings";
import Groups from "../pages/Groups";

// const domain = import.meta.env.VITE_AUTH0_DOMAIN;
// const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const Layout = () => {
  return (
    <>
      <Navbar />
      <TokenProvider>
        <Outlet />
      </TokenProvider>
      <Footer />
    </>
  );
};

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "mis-eventos/:nickname", element: <Profile /> }, // este componente deberia llamarse 'Events'
      { path: "grupos/:nickname", element: <Groups /> },
      { path: "crear-evento/formulario", element: <CreateForm /> },
      { path: "configuración", element: <Settings /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={BrowserRouter} />;
}
