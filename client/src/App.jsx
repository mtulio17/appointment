// import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import AppRouter from "./layout/Router";
import { FavoritesProvider } from "./context/SaveEventContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Crear una instancia de QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <FavoritesProvider>
            <AppRouter />
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
          </FavoritesProvider>
        </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
