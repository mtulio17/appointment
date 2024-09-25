// import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import AppRouter from "./layout/Router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <ModalProvider>
      <AppRouter />
    </ModalProvider>
  );
}

export default App;
