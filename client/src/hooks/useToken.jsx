import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useToken = () => {
  return useContext(AuthContext);
};
export default useToken;
