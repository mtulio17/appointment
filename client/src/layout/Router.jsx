
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../layout/Home";
import Profile from "../components/Profile";
import CreateForm from "../components/CreateForm";
import Layout from "../layout/Layout";
import Login from "../components/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "sign-in/",
        element: <Login />,
      },
      {
        path: "profile/",
        element: <Profile />,
      },
      {
        path: "profile/create-event",
        element: <CreateForm />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}