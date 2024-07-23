import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPhonePage from "../pages/CheckEmailPhonePage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import HomePage from "../pages/HomePage";
import MessagePage from "../component/MessagePage";
import AuthLayout from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "Register",
        element: 
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        
      },
      {
        path: "Email",
        element: 
          <AuthLayout>
            <CheckEmailPhonePage />
          </AuthLayout>
      },
      {
        path: "Password",
        element: 
          <AuthLayout>
            <CheckPasswordPage />
          </AuthLayout>
        
      },
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
