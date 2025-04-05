import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthenticateWithRedirectCallback,
  ClerkProvider,
} from "@clerk/clerk-react";
import Home from "./pages/Home.tsx";
import AuthProvider from "./provider/AuthProvider.tsx";
import AuthCallback from "./pages/auth-callback/AuthCallback.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import Chat from "./pages/Chat.tsx";

const PUBLISHABLE_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/chat",
        element: <Chat />,
      },
    ],
    errorElement: <div>Error page</div>,
  },
  { path: "/auth-callback", element: <AuthCallback /> },
  { path: "/sso-callback", element: <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>
);
