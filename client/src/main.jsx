import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { esES } from "@clerk/localizations";
import SyncSession from "./components/auth/SyncSession.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ClerkProvider localization={esES} publishableKey={PUBLISHABLE_KEY} fallbackRedirectUrl={"/"} afterSignOutUrl="/">
    <SyncSession />
    <App />
  </ClerkProvider>
</React.StrictMode>
);
