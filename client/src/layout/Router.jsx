import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../layout/Home";
import Layout from "../layout/Layout";
import PostEvent from "../components/PostEvent";
import PrivateRoute from "../components/PrivateRoute";
import EventDetails from '../components/EventDetails';
import SearchResults from '../components/SearchResults';
import EventsCreated from '../components/EventsCreated';
import SavedEvents from '../pages/saved-events';
import EventsPage from '../pages/events-page';
import CategoryResult from '../pages/category-result';
import Help from '../components/Help'
import PrivacyPolicy from '../components/PrivacyPolicy'
import TermsOfUse from '../components/TermsOfUse';
import AboutUs from '../components/AboutUs';
import EventsList from '../components/EventsList';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="search/" element={<SearchResults />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/events/category/:categoryId" element={<CategoryResult />} />
        <Route path="/all-events" element={<EventsPage />} />
        {/* <Route path="/all-events" element={<EventsList />} /> */}

        <Route path="/help" element={<Help />} />
        <Route path="/privacy-policies" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Rutas protegidas */}
        <Route path="/post-event" element={<PrivateRoute element={<PostEvent />} />} />
        <Route path="/my-created-events" element={<PrivateRoute element={<EventsCreated />} />} />
        <Route path='/saved-events' element={<PrivateRoute element={<SavedEvents />} />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;