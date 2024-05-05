import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import RootLayout from "./layouts/RootLayout";
import { PATHS } from "./constants/Navigation";
import "./index.css";
import Schedule from "./pages/Schedule";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        ...PATHS.map((item) => ({
          path: item.link,
          element: item.element,
        })),
      ],
    },
    {
      path: "/schedule", 
      element: <Schedule />
    },
    {
      path: "/login", 
      element: <LoginForm onSubmit={function (email: string, password: string): void {
        throw new Error("Function not implemented.");
      } } />
    },
    {
      path: "/signup", 
      element: <SignUpForm onSubmit={function (firstName: string, lastName: string, email: string, password: string): void {
        throw new Error("Function not implemented.");
      } } />
    },
    {
      path: "/profile", 
      element: <Profile />
    },

  ]);

export default function App() {
    return (
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}