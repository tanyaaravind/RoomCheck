
import HomePage from "../pages/Home";
import Schedule from "../pages/Schedule";
import LoginForm from "../pages/Login";
import SignUpForm from "../pages/SignUp";
import Profile from "../pages/Profile";

/**
 * TODO:
 * When developing locally (on your computer) this should be http://localhost:8080
 *
 * When you deploy, modify this constant to point to the URL of your backend.
 * It should be of the format "https://<app-name>.fly.dev/api"
 *
 * Most of the time, the name of your app is the name of the folder you're in
 * right now, and the name of your Git repository.
 * For instance, if that name is "my-app", then you should set this to:
 * "https://my-app.fly.dev/api"
 *
 * If you've already deployed your app (using `fly launch` or `fly deploy`),
 * you can find the name by running `flyctl status`, under App > Name.
 */
export const BACKEND_BASE_PATH = "http://localhost:8080";

export const PATHS: {
    link: string;
    label: string;
    element?: JSX.Element;
}[] = [
    {
        link: "/",
        label: "Home",
        element: <HomePage />,
    },
    {
        link: "/",
        label: "Schedule",
        element: <Schedule />,
    },
    {
        link: "/",
        label: "Profile",
        element: <Profile />,
    },
    {
        link: "/",
        label: "Login",
        element: <LoginForm onSubmit={function (email: string, password: string): void {
            throw new Error("Function not implemented.");
        } } />,
    },
    {
        link: "/",
        label: "Signup",
        element: <SignUpForm onSubmit={function (firstName: string, lastName: string, email: string, password: string): void {
            throw new Error("Function not implemented.");
        } } />,
    },
    
];
