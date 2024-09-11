import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../layout/Home";
import Layout from "../layout/Layout";
import PostEvent from "../components/PostEvent";
import PrivateRoute from "../components/PrivateRoute";
import EventDetails from '../components/EventDetails';
import SearchResults from '../components/SearchResults';
import EventsCreated from '../components/EventsCreated';
import SavedEvents from '../pages/saved-events';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="search/" element={<SearchResults />} />
        <Route path="/event/:id" element={<EventDetails />} />
        {/* Rutas protegidas */}
        <Route path="/post-event" element={<PrivateRoute element={<PostEvent />} />} />
        <Route path="/my-created-events" element={<PrivateRoute element={<EventsCreated />} />} />
        <Route path='/saved-events' element={<PrivateRoute element={<SavedEvents />} />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;