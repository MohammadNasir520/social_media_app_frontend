
import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFonund from "../pages/NotFonund";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../layout/Main";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [

            {
                path: "/home",
                element: <Home></Home>,
            },
            {
                path: "/signin",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },]

    },
    {
        path: "*",
        element: <NotFonund />,
    },
]);

export default router