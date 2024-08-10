import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import AppRouter from "./layout/Router";

function App() {
  return (
    <>
      <AuthProvider>
        <EventProvider>
          <AppRouter />
        </EventProvider>
      </AuthProvider>
    </>
  );
}

export default App;
