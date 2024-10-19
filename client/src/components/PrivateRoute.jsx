import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import {ClipLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center mt-20">
          <ClipLoader color={"#212121"} size={40} />
      </div>
    );
  }

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" className="animate-jump" />;
  }

  return element;
};

export default PrivateRoute;
