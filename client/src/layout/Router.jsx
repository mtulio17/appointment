
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../layout/Home";
import Profile from "../components/Profile";
import CreateForm from "../components/CreateForm";
import Layout from "../layout/Layout";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import SuggestedEvents from "../components/SuggestedEvents";
import PrivateRoute from "../components/PrivateRoute";


const router = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="suggested-events" element={<PrivateRoute element={<SuggestedEvents />} />} />
        <Route path="profile/create-event" element={<PrivateRoute element={<CreateForm />} />} />
      </Route>
    </Routes>
  </Router>
);

export default router;