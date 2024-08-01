import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
    const { user } = useAuth();
  
    return user ? element : <Navigate to="/sign-in" />;
  };
  
  export default PrivateRoute;
